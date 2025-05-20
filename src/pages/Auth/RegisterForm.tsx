import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/constants";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      toast(data.message);

      if (response.status === 201) {
        const username = data.user.username;
        const email = data.user.email;

        setUser({ username, email });
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <h1 className="text-center text-3xl font-semibold">
        Register yourself to TaskMaster
      </h1>
      <form className="space-y-4 w-md " onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="12345"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit" className="btn btn-primary">
            Register
          </Button>

          <Link to="/login" className="text-sm text-center">
            Already have account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
