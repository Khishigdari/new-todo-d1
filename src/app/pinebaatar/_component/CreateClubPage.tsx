"use client";

import React, { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Teachers } from "./Teachers";
import { Calendar } from "@/components/ui/calendar";
import { Frequency } from "./Frequency";
import { ClassRoom } from "./ClassRoom";
import { StartTime } from "./StartTime";
import { Duration } from "./Duration";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { ClassTeacherType } from "@/lib/types";

const CreateClubPage = () => {
  const [clubName, setClubName] = useState<string>("");
  const [teacherName, setTeacherName] = useState<ClassTeacherType[]>([]);
  const [clubDesc, setClubDesc] = useState<string>("");
  const [clubStartDate, setClubStartDate] = useState<Date | undefined>();
  const [clubFrequency, setClubFrequency] = useState<string>("");
  const [clubClassRoom, setClubClassRoom] = useState<number>();
  const [clubStartTime, setClubStartTime] = useState<string>("");
  const [clubDuration, setClubDuration] = useState<string>("");
  const [clubMaxStudent, setClubMaxStudent] = useState<string>("");
  const [clubMinStudent, setClubMinStudent] = useState<string>("");
  console.log({ clubStartDate });
  return (
    <div className=" min-w-180 p-10 m-auto">
      <Card className="p-10">
        <CardHeader className="flwx justify-center font-semibold text-xl">
          Шинэ клуб нээх
        </CardHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="clubName">Клубын нэр</Label>
            <Textarea
              placeholder="Клубын нэр"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </Field>
          <Teachers teacherName={teacherName} setTeacherName={setTeacherName} />
          <Field>
            <Label htmlFor="description">Клубын зорилго</Label>
            <Textarea
              placeholder="Клубын зорилго"
              value={clubDesc}
              onChange={(e) => setClubDesc(e.target.value)}
            />
          </Field>
          <FieldGroup className="md:grid md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="timetable">Клубын хуваарь</FieldLabel>
              <Calendar
                mode="single"
                className="rounded-lg border"
                onDayClick={(day) => {
                  setClubStartDate(day);
                }}
              />
            </Field>
            <Field>
              <Frequency />
              <div className="flex justify-between gap-5">
                <ClassRoom />
                <StartTime />
              </div>
              <Duration />
              <FieldLabel htmlFor="studentNumber">Сурагчдын тоо</FieldLabel>
              <Input
                // id="studentNumber"
                placeholder="Max: 20"
                value={clubMaxStudent}
                onChange={(e) => setClubMaxStudent(e.target.value)}
              />
              <Input
                // id="studentNumber"
                placeholder="Min"
                value={clubMinStudent}
                onChange={(e) => setClubMinStudent(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </FieldGroup>
      </Card>
    </div>
  );
};

export default CreateClubPage;
