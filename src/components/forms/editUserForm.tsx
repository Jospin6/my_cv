import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  summary: z.string().optional(),
  skills: z.string().optional(),
  hobbies: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function EditUserForm({ defaultValues }: { defaultValues: Partial<UserFormValues> }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = (data: UserFormValues) => {
    console.log("Form Submitted", data);
    // tu peux ici envoyer les données vers le backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-4 rounded-xl space-y-4">
      <InputField
        label="Email"
        name="email"
        placeholder="example@email.com"
        type="email"
        register={register}
        errors={errors}
      />
      <InputField
        label="Name"
        name="name"
        placeholder="Your full name"
        register={register}
        errors={errors}
      />
      <InputField
        label="Phone"
        name="phone"
        placeholder="+243..."
        register={register}
        errors={errors}
      />
      <InputField
        label="Address"
        name="address"
        placeholder="City, Country"
        register={register}
        errors={errors}
      />
      <InputField
        label="LinkedIn"
        name="linkedin"
        placeholder="https://linkedin.com/in/..."
        register={register}
        errors={errors}
      />
      <InputField
        label="Portfolio"
        name="portfolio"
        placeholder="https://yourportfolio.com"
        register={register}
        errors={errors}
      />

      <TextAreaField
        label="Professional Summary"
        name="summary"
        placeholder="Brief summary about your experience and goals..."
        register={register}
        errors={errors}
      />

      <TextAreaField
        label="Skills"
        name="skills"
        placeholder="List your technical and soft skills"
        register={register}
        errors={errors}
      />

      <TextAreaField
        label="Hobbies"
        name="hobbies"
        placeholder="What do you enjoy doing outside of work?"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end">
        <Button type="submit">{isSubmitting ? "Saving..." : "Save Profile"}</Button>
      </div>
    </form>
  );
}
