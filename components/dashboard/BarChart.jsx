"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ANALYTICS_EMOJIS, COUNTRY_FLAGS } from "@/constants";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const DisplayBarChart = ({ name = "", data }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(null);
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setCurrentActiveTab(Object.keys(data)[0]);
    }
  }, [data]);

  const options = Object.keys(data);
  const BARLIST_DATA = Object.entries(data[currentActiveTab] || {}).map(
    ([item, itemCount]) => {
      if (currentActiveTab === "country" || currentActiveTab === "city") {
        const [city, country] = item.split(", ");
        return {
          name: currentActiveTab === "country" ? country : city,
          value: itemCount,
          icon: () => <p className="mr-2">{COUNTRY_FLAGS.get(country)}</p>,
        };
      }
      console.log(item);
      return {
        name: itemCount._id,
        value: itemCount.count,
        icon: () => (
          <p className="mr-2">
            {ANALYTICS_EMOJIS[currentActiveTab][itemCount._id] ?? "❓"}
          </p>
        ),
      };
    },
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-cente justify-between ">
          <h3>{name}</h3>
          <div className="flex items-center gap-3 ">
            {options.map((option, i) => {
              const isActive = currentActiveTab === option;
              return (
                <Button
                  onClick={() => setCurrentActiveTab(option)}
                  key={option}
                  size={"sm"}
                  variant={isActive ? "default" : "ghost"}
                  className={cn("px-3 py-1 text-xs capitalize", {
                    "font-semibold": currentActiveTab === option,
                  })}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="horizontal"
            width={150}
            height={40}
            data={BARLIST_DATA}
          >
            <Bar layout="horizontal" dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DisplayBarChart;
