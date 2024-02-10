"use client";
import React, { useState } from "react";
import { MyDialog } from "@/components/common/Dialoug";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function ReportDialouge({ name }) {
  const [open, setOpen] = useState(false);
  return (
    <MyDialog
      open={open}
      setOpen={setOpen}
      title={"Report"}
      description="Please select the reason that best describes your problem."
    >
      <form
        className="flex flex-col gap-4 w-[100%]"
        onSubmit={(s) => {
          s.preventDefault();
          const formData = new FormData(s.target);
          console.log(formData.get("reason"));
        }}
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold capitalize">reason</label>

          <Select
            size="large"
            className="min-w-[100%] bg-red-600"
            name="reason"
            required
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Spam or advertising">
                Spam or advertising
              </SelectItem>
              <SelectItem value="Illegal or violent content">
                Illegal or violent content
              </SelectItem>
              <SelectItem value="Hacking or scaming">
                Hacking or scaming
              </SelectItem>
              <SelectItem value="Harasment or hate speach">
                Harasment or hate speach
              </SelectItem>
              <SelectItem value="others">others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold capitalize">description</label>
          <Input
            name="description"
            placeholder="tell us more about the issue"
          />
        </div>
        <div className="flex flex-row justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </DialogClose>

          <Button variant="destructive" type="submit">
            Submit Report
          </Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default ReportDialouge;
