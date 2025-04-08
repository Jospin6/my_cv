import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  school: z.string().min(1, "School is required"),
  location: z.string().min(1, "Location is required"),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  description: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationSchema>;

export default function EducationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    // defaultValues,
  });

  const onSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-4 rounded-xl space-y-4">
      <InputField
        label="Degree"
        name="degree"
        placeholder="ex: Bachelor of Science in Computer Science"
        register={register}
        errors={errors}
      />
      <InputField
        label="School"
        name="school"
        placeholder="ex: Harvard University"
        register={register}
        errors={errors}
      />
      <InputField
        label="Location"
        name="location"
        placeholder="ex: Cambridge, USA"
        register={register}
        errors={errors}
      />
      <InputField
        label="Start Date"
        name="start"
        placeholder="YYYY-MM-DD"
        type="date"
        register={register}
        errors={errors}
      />
      <InputField
        label="End Date"
        name="end"
        placeholder="YYYY-MM-DD (optional)"
        type="date"
        register={register}
        errors={errors}
      />
      <TextAreaField
        label="Description"
        name="description"
        placeholder="Brief description of your studies, projects, or achievements"
        register={register}
        errors={errors}
      />
      <div className="flex justify-end">
        <Button type="submit">{isSubmitting ? "Saving..." : "Add Education"}</Button>
      </div>
    </form>
  );
}
