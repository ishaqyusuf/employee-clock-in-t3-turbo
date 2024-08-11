"use client";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";

export default function Bootstrap() {
  const initBootstrap = api.bootstrap.init.useMutation({
    onSuccess: async () => {
      toast.success("Done");
    },
    onError(err) {},
  });
  return (
    <>
      <Button
        onClick={() => {
          initBootstrap.mutate();
        }}
      >
        Bootstrap
      </Button>
    </>
  );
}
