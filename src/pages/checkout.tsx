import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { StoreContext } from "@/context/store-context";
import { AuthContext } from "@/context/auth-context";
import { Textarea } from "@/components/ui/textarea";
import { luhnCheck } from "@/lib/utils";
import DatePicker from "@/components/custom/shared/date-picker";
import { useToast } from "@/hooks/use-toast";

const phoneRegex = /^0\d{10}$/;

const formSchema = z.object({
  email: z.string().email({ message: "Please enter your email" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: "Invalid phone number",
  }),
  street: z.string().min(1, { message: "Street address required" }),
  city: z.string().min(1, { message: "City/Town is required" }),
  state: z.string().min(1, { message: "State/Province/Region is required" }),
  postal: z.string().min(1, { message: "Postal/Zip Code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  instruction: z.string().optional(),
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, {
      message: "Card number must be between 13 to 19 digits.",
    })
    .refine((val) => luhnCheck(val), {
      message: "Invalid card number.",
    }),
  exp: z.date({ message: "Card expired date is required" }),
  cvc: z.string().regex(/^\d{3,4}$/, {
    message: "CVC code must be 3 or 4 digits.",
  }),
});

const Checkout = () => {
  const { subTotal, cartItems } = useContext(StoreContext);
  const { user } = useContext(AuthContext);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      instruction: "",
      cardNumber: "",
      cvc: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { cardNumber, exp, cvc, ...rest } = values;

    const orderData = {
      user: rest,
      orderItems: cartItems,
      payableAmount: subTotal * 100, // in coin amount
      bankInfo: { cardNumber, exp, cvc },
    };

    console.log(orderData);
    toast({
      title: "🎉Success!",
      description:
        "Payment successful. Your order has been created successfully.",
    });
  };

  return (
    <section className="container mx-auto p-4 min-h-[77.5vh] max-h-full">
      <div className="flex justify-center items-center">
        <Card className="md:w-[60%] sm:w-[70%] w-full bg-slate-50">
          <CardHeader>
            <CardTitle>Checkout Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter street address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/Town</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city/town" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province/Region</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter state/province/region"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter postal/zip code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="instruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter delivery instruction"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-[16px]">
                      Bank Card Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 w-full">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter card number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="exp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expired date</FormLabel>
                            <FormControl>
                              <DatePicker
                                {...field}
                                date={field.value}
                                setDate={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter cvc" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Button type="submit" className="w-full">
                  Pay € {subTotal}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Checkout;
