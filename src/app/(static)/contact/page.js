"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
function Page() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result?.res?.success) {
        toast({
          description: "Email Send SuccessFully",
        });
      } else {
        throw new Error("soemthing went wrong");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something Went Wrong",
      });
    } finally {
      e.target?.reset();
      setLoading(false);
    }
  };
  return (
    <main className="py-[75px] ">
      <Toaster />
      <div className="container flex flex-col gap-6">
        <h1 className="text-5xl text-center bold">Contact</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <form
          //   action={formAction}
          onSubmit={submitHandler}
          className="flex flex-col p-4 max-w-[550px] w-[100%] gap-4 rounded-md border border-primary-foreground"
        >
          <div className="flex flex-col gap-2 p-2 w-[100%]">
            <label>Name *</label>
            <Input name="name" required placeholder="name" />
          </div>
          <div className="flex flex-col gap-2 p-2 w-[100%]">
            <label>Email *</label>
            <Input name="email" required type="email" placeholder="email" />
          </div>
          <div className="flex flex-col gap-2 p-2 w-[100%]">
            <label>message *</label>
            <Textarea name="body" required placeholder="message" />
          </div>
          <div>
            <Button
              disabled={loading}
              type="submit"
              className="w-[100%] max-w-[100px]"
            >
              send
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
function SubmitButton() {
  //   const { pending } = useFormStatus();

  return <Button type="submit">Send</Button>;
}

export default Page;
