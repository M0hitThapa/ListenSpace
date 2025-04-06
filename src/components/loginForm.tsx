"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PEOPLES_IMAGES } from "@/images"
import Cookies from "universal-cookie"

interface FormValues {
  username:string;
  name:string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
const cookies = new Cookies();
  const schema = yup.object().shape({
    username:yup
    .string()
    .required("Username is Required")
    .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid Username"),
    name: yup.string().required("Name is Required"),
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
const {username,name} = data;

const response = await fetch("http://localhost:3001/auth/createUser", {
method:"POST",
headers: {
  "Content-Type":"application/json"
},
body: JSON.stringify({
  username,
  name,
  image: PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
}),
});
if(!response.ok) {
  alert("some error occures while signin");
  return;
}
const responseData = await response.json()
console.log(responseData);
const expires = new Date()
expires.setDate(expires.getDate() + 1);
cookies.set("token", responseData.token, {
expires,
});
cookies.set("username", responseData.username, {
  expires,
  });
  cookies.set("name", responseData.name, {
    expires,
    });
  }

  const {register, handleSubmit,formState: {errors}, } = useForm<FormValues>({ resolver:yupResolver(schema)})
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">SignIn your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Name below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">UserName</Label>
          <Input id="username" type="username" placeholder="Enter Your username" required {...register("username")}/>
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Name</Label>
          
          </div>
          <Input id="name" type="name" required {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          SignIn
        </Button>
       
       
      </div>
     
    </form>
  )
}
