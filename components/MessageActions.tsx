"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {IMessage, useMessage} from "@/lib/store/messages";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";

export function DeleteAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessage(
    (state) => state.optimisticDeleteMessage,
  );
  const handleDeleteMessage = async () => {
    const supabase = createClient();
    optimisticDeleteMessage(actionMessage?.id!);
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actionMessage?.id!);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully deleted the message!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id={"trigger-delete"}></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            message and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticUpdateMessage = useMessage((state) => state.optimisticUpdateMessage);
  const inputRef = useRef({}) as React.RefObject<HTMLInputElement>;

  const handleEdit = async () => {
    const supabase = createClient();
    const text = inputRef.current.value.trim();
    if (text) {
      optimisticUpdateMessage({
        ...actionMessage,
        text,
        is_edit: true
      } as IMessage)

      const { error } = await supabase
        .from("messages")
        .update({ text, is_edit: true })
        .eq("id", actionMessage?.id!);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully edited the message");
      }
      document.getElementById("trigger-edit")?.click();
    } else {
      document.getElementById("trigger-edit")?.click();
      document.getElementById("trigger-delete")?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id={"trigger-edit"}></button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            Make changes to your message here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Input id="name" defaultValue={actionMessage?.text} ref={inputRef} />

        <DialogFooter>
          <Button type={"submit"} onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
