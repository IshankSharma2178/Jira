"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workSpaceSchema } from "@/validation/workspace-schema/workspace-validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  onCancel?: () => void;
}

const CreateWorkspaceForm = ({ onCancel }: Props) => {
  const router = useRouter();

  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof workSpaceSchema>>({
    resolver: zodResolver(workSpaceSchema),
    defaultValues: { name: "", image: undefined },
  });

  const onSubmit = (values: z.infer<typeof workSpaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          setPreview(null);
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Workspace Icon</FormLabel>
                  <div className="flex items-center gap-x-5">
                    {preview ? (
                      <div className="size-[72px] relative rounded-sm overflow-hidden">
                        <Image
                          className="object-cover"
                          fill
                          src={preview}
                          alt="Workspace Image"
                        />
                      </div>
                    ) : (
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <ImageIcon className="size-[36px] text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, SVG, or JPEG (Max: 1MB)
                      </p>
                      <Input
                        type="file"
                        accept=".jpg,.png,.jpeg,.svg"
                        className="hidden"
                        ref={inputRef}
                        onChange={handleImageChange}
                        disabled={isPending}
                      />
                      <Button
                        type="button"
                        disabled={isPending}
                        variant="teritary"
                        size="xs"
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between mt-7">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(onCancel ? "block" : "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
