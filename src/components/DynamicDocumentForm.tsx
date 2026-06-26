import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "checkbox";

export interface SchemaField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  description?: string;
  options?: string[];
  default?: string | number | boolean;
}

export interface SchemaSection {
  title: string;
  fields: SchemaField[];
}

export interface FieldSchema {
  sections: SchemaSection[];
}

interface Props {
  schema: FieldSchema;
  submitting?: boolean;
  onSubmit: (values: Record<string, unknown>) => void;
}

const DynamicDocumentForm: React.FC<Props> = ({ schema, submitting, onSubmit }) => {
  const defaultValues = useMemo(() => {
    const v: Record<string, unknown> = {};
    schema.sections.forEach((s) =>
      s.fields.forEach((f) => {
        v[f.name] =
          f.default !== undefined
            ? f.default
            : f.type === "checkbox"
            ? false
            : f.type === "number"
            ? ""
            : "";
      }),
    );
    return v;
  }, [schema]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  const validate = (f: SchemaField) =>
    f.required ? { required: `${f.label} is required` } : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {schema.sections.map((section) => (
        <Card key={section.title} className="border-legal-light">
          <CardContent className="pt-6">
            <h3 className="font-serif text-xl font-semibold text-legal-primary mb-4">
              {section.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {section.fields.map((f) => {
                const err = errors[f.name]?.message as string | undefined;
                const fullWidth =
                  f.type === "textarea" || f.type === "checkbox";
                return (
                  <div
                    key={f.name}
                    className={fullWidth ? "md:col-span-2" : undefined}
                  >
                    {f.type !== "checkbox" && (
                      <Label htmlFor={f.name} className="mb-1.5 block">
                        {f.label}
                        {f.required && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </Label>
                    )}

                    {f.type === "text" && (
                      <Input
                        id={f.name}
                        {...register(f.name, validate(f))}
                      />
                    )}

                    {f.type === "number" && (
                      <Input
                        id={f.name}
                        type="number"
                        {...register(f.name, validate(f))}
                      />
                    )}

                    {f.type === "date" && (
                      <Input
                        id={f.name}
                        type="date"
                        {...register(f.name, validate(f))}
                      />
                    )}

                    {f.type === "textarea" && (
                      <Textarea
                        id={f.name}
                        rows={3}
                        {...register(f.name, validate(f))}
                      />
                    )}

                    {f.type === "select" && (
                      <Controller
                        name={f.name}
                        control={control}
                        rules={validate(f)}
                        render={({ field }) => (
                          <Select
                            value={(field.value as string) || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id={f.name}>
                              <SelectValue placeholder={`Select ${f.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {(f.options ?? []).map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    )}

                    {f.type === "checkbox" && (
                      <Controller
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={(v) => field.onChange(!!v)}
                            />
                            <span className="text-sm font-medium">
                              {f.label}
                            </span>
                          </label>
                        )}
                      />
                    )}

                    {f.description && (
                      <p className="mt-1 text-xs text-legal-secondary">
                        {f.description}
                      </p>
                    )}
                    {err && (
                      <p className="mt-1 text-xs text-destructive">{err}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-legal-primary hover:bg-legal-primary/90 text-white"
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Document
        </Button>
      </div>
    </form>
  );
};

export default DynamicDocumentForm;
