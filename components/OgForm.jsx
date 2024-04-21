"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Loader } from "lucide-react";
import axios from "axios";
import OgCard from "./OgCard";
import { cn } from "@/lib/utils";

const socialSite = ["twitter", "linkedin", "facebook", "discord"];

const OgFormAndPreview = ({ shortUrl, _id: id, metadata }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["saveMetada"],
    mutationFn: async (formdata) => {
      const res = await axios.patch(`/api/url/${id}`, formdata);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([id]);
      toast({
        title: "Metadata updated!",
      });
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: "Failed to save metadata.",
        action: (
          <ToastAction altText="retry" onClick={mutate}>
            Retry
          </ToastAction>
        ),
      });
    },
  });
  const [og, setOg] = useState({
    title:
      metadata?.title ??
      "OpenGraph - Preview Social Media Share and Generate Metatags",
    description:
      metadata?.description ??
      "OpenGraph is the easiest way to preview and generate open graph meta tags for any website.",
    image: metadata?.ogCover ?? "/og.png",
    file: null,
  });
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files?.length > 0) return;
    const image = files[0];
    const url = URL.createObjectURL(image);
    setOg((pre) => ({ ...pre, image: url, file: image }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!og.title || !og.description || !og.file) return;
    const formData = new FormData();
    formData.append("title", og.title);
    formData.append("description", og.description);
    formData.append("file", og.file);

    mutate(formData);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border rounded-xl h-full p-2 md:p-4 w-full max-w-xl "
      >
        <div className="space-y-3">
          <Label htmlFor={"title"}>Title</Label>
          <Input
            value={og.title}
            name={"title"}
            onChange={(e) =>
              setOg((pre) => ({ ...pre, title: e.target.value }))
            }
            placeholder="Your title..."
            id="title"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={og.description}
            onChange={(e) =>
              setOg((pre) => ({ ...pre, title: e.target.value }))
            }
            placeholder="Write your description..."
            id="description"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor={"image"}>Image</Label>
          <Input
            name="ogCover"
            onChange={handleImageChange}
            type="file"
            placeholder="Your title..."
            accept="image/*"
            id="image"
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Recommended size: <span className="italic">1200x630</span>
        </p>
        <Button disabled={isPending} type="submit">
          {isPending ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
          Submit
        </Button>
      </form>
      {socialSite.map((site, i) => (
        <div
          key={site}
          className={cn("h-full", {
            "col-span-2 ": i == 0,
          })}
        >
          <OgCard
            title={og.title}
            description={og.description}
            image={og.image}
            shortUrl={shortUrl}
            socialSite={site}
          />
        </div>
      ))}
    </div>
  );
};

export default OgFormAndPreview;
