"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    // toast("Wow so easy!");
    const result = await signInUser(data);
    if (result.status === "success") {
      console.log("success beim login!");
      router.push("/subjects");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Card className="w-full max-w-[400px] lg:max-w-[400px] min-h-[200px] mx-auto">
      <CardHeader>
        <div className="flex flex-col gap-2 items-center text-pprimary-600">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-blue-600">Welcome back to Places26</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input defaultValue="" label="Email" variant="bordered" {...register("email")} isInvalid={!!errors.email} errorMessage={errors.email?.message as string} />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth className="bg-pprimary-600" type="submit">
              Login
            </Button>
            <ToastContainer />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
