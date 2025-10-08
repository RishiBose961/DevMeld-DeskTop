import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserCircle,
} from "lucide-react";

import data from "@/hook/mock/data";
import { registerUser } from "@/services/authapi"; // ✅ api function

export default function Register() {
  const navigate = useNavigate();
  const { existingCompanies } = data();
  const uniqueCompanies = [...new Set(existingCompanies)];

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Account created successfully!");
      navigate("/signin");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Something went wrong";
     alert(errorMessage || "Something went wrong");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "" ? "Name is required" : "",
      company: formData.company.trim() === "" ? "Company is required" : "",
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ? "Invalid email address"
        : "",
      password:
        formData.password.length < 6
          ? "Password must be at least 6 characters"
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => !msg);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (!validateForm()) return;

    mutation.mutate({
      fullName: formData.name,
      companyName: formData.company,
      emailAddress: formData.email,
      password: formData.password,
    }); 
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign up to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="pl-10 h-11"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <div className="pl-10">
                  <Select
                    value={formData.company}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, company: value }))
                    }
                  >
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select a company name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Company Name</SelectLabel>
                        {uniqueCompanies.map((company) => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {errors.company && (
                <p className="text-sm text-red-500 mt-1">{errors.company}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-11"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Already have an account */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin">
                <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                  Sign in here
                </button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
