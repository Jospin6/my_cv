import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/user/userSlice";

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

export default function EditUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    // defaultValues,
  });
  const dispatch = useDispatch<AppDispatch>()
  const id = "dfsds-jhehze-dsd"

  const onSubmit = (data: UserFormValues) => {
    dispatch(updateUser({id, data}))
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-4 rounded-xl w-full">
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
