
import { useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";
import { TextAreaField } from "../ui/textAreaField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  url: z.string().url("Enter a valid URL").min(1, "Project URL is required"),
  description: z.string().min(1, "Project description is required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log("Form Data:", data);
    // Ici, vous pouvez envoyer les données au backend ou les stocker
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
      <InputField
        label="Project Title"
        name="title"
        placeholder="Enter project title"
        register={register}
        errors={errors}
      />

      <InputField
        label="Project URL"
        name="url"
        placeholder="Enter project URL"
        register={register}
        errors={errors}
      />

      <TextAreaField
        label="Project Description"
        name="description"
        placeholder="Enter project description"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end my-4">
        <Button type="submit">Save Project</Button>
      </div>
    </form>
  );
}
