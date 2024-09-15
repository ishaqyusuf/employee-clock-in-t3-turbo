"use client";

import { CreateStudentSchema } from "@acme/db/schema";
import Button from "@acme/ui/common/button";
import FormInput from "@acme/ui/controlled-inputs/form-input";
import FormSelect from "@acme/ui/controlled-inputs/form-select";
import { Form, useForm } from "@acme/ui/form";
import { toast } from "@acme/ui/toast";

import { useClassrooms } from "~/hooks/use-classrooms";

export default function CreateBillable() {
  const form = useForm({
    schema: CreateStudentSchema,
    defaultValues: {},
  });
  const sessionClassId = form.watch("sessionClassId");
  const classRooms = useClassrooms({
    loadOnInit: true,
  });

  async function _create() {
    // await getStudentList();
    // const data = form.getValues();
    // const s = data.services.find((s) => s.id == data.serviceId);
    // let workerIds = [];
    // Object.entries(data.selection).map(([k, v]) => v && workerIds.push(k));
    // const resp = await createBillables(data.serviceId, s?.amount, workerIds);
    toast.success("Saved");
    // form.reset();
    // await revalidatePath('')
    toast.success("Billables created");
  }

  return (
    <div className="p-4">
      <div className="">Create Student</div>
      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="firstName"
            className="col-span-2"
            label="First Name"
          />
          <FormInput control={form.control} name="surname" label="Surname" />
          <FormInput
            control={form.control}
            name="otherName"
            label="Other Name"
          />
          <FormSelect
            options={classRooms.classRooms}
            // type="combo"
            titleKey="classRoom.name"
            valueKey="id"
            control={form.control}
            name="sessionClassId"
            label="Class"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            action={_create}
            icon="add"
            variant={"outline"}
            className=""
            size={"sm"}
            text={"Create"}
          />
        </div>
      </Form>
    </div>
  );
}
