"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useState } from "react";
import { Teachers, Frequency, ClassRoom, StartTime, Duration } from "./index";

export function CreateClubBtn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCreateClub = () => {
    setIsOpen(isOpen);
    toast.success("Club has been created successfully", {
      position: "top-center",
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
            Create Club <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Шинэ клуб нээх</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="clubName">Клубын нэр</Label>
              <Textarea placeholder="Клубын нэр" />
            </Field>
            {/* <Teachers /> */}
            <Field>
              <Label htmlFor="description">Клубын зорилго</Label>
              <Textarea placeholder="Клубын зорилго" />
            </Field>
            <FieldGroup className="md:grid md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="timetable">Клубын хуваарь</FieldLabel>
                <Calendar mode="single" className="rounded-lg border" />
              </Field>
              <Field>
                <Frequency />
                <div className="flex justify-between gap-5">
                  <ClassRoom />
                  <StartTime />
                </div>
                <Duration />
                <FieldLabel htmlFor="studentNumber">Сурагчдын тоо</FieldLabel>
                <Input id="studentNumber" placeholder="Max: 20" />
                <Input id="studentNumber" placeholder="Min" />
              </Field>
            </FieldGroup>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleCreateClub}>
              Create Club
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
