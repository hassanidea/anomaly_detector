"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const Form = () => {
  const [date, setDate] = React.useState<Date>();
  const [vix, setVix] = useState("");
  const [gtitly, setGtitly] = useState("");

  const handleSend = async () => {
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, vix, gtitly }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl">Detect Anomaly</CardTitle>
          <CardDescription>
            Input VIX and Government Treasury Italy 2-Year Bond Yield
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="vix">VIX</Label>
                <Input
                  id="vix"
                  placeholder="VIX ticker value"
                  value={vix}
                  onChange={(e) => setVix(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gtitly">
                  Government Treasury Italy 2-Year Bond Yield
                </Label>
                <Input
                  id="gtitly"
                  placeholder="Government Treasury Italy 2-Year Bond Yield ticker value"
                  value={gtitly}
                  onChange={(e) => setGtitly(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Choose a Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSend}>Predict</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Form;
