"use client";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,    
  Send,
  MessageSquare,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const form = useRef();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z335l2i",
        "template_9dpfetf",
         form.current,
        "TcE2MBOw4r4Mp-jYi"
      )
      .then(
        (result) => {
          setNotificationMessage("Message sent successfully!");
          setNotificationType("success");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
           form.current.reset();
          console.log(result.text);
        },
        (error) => {
          setNotificationMessage(
            "Failed to send the message. Please try again."
          );
          setNotificationType("danger");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
          console.log(error.text);
        }
      );
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@mylikita.com",
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+2349064240961",
      description: "Speak with our team Monday to Friday, 9AM - 6PM WAT",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Office: Floor 1,African Alliance Building Sani Abacha Way,Kano,Nigeria",
      description: "Branch: Flat 42, DROL Estate Wuye Abuja,Nigeria",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - stu: 9AM - 6PM WAT",
      description: "We're here to help during business hours",
    },
  ];

  const faqs = [
    {
      question: "How long does implementation typically take?",
      answer:
        "Implementation timelines vary based on facility size and complexity, typically ranging from 2-8 weeks.",
    },
    {
      question: "Do you provide training for our staff?",
      answer:
        "Yes, we provide comprehensive training programs for all users, including administrators, healthcare providers, and support staff.",
    },
    {
      question: "Is your system compliant with healthcare regulations?",
      answer:
        "Our systems are designed to meet international healthcare standards and local regulatory requirements across African countries.",
    },
    {
      question: "What kind of support do you offer after implementation?",
      answer:
        "We provide 24/7 technical support, regular system updates, and ongoing training to ensure optimal system performance.",
    },
    {
      question:
        "Can your systems integrate with existing healthcare equipment?",
      answer:
        "Yes, our solutions are designed for seamless integration with most medical devices and existing infrastructure.",
    },
    {
      question: "What are your pricing models?",
      answer:
        "We offer flexible pricing models including subscription-based and one-time licensing options.",
    },
  ];

  return (
    <div className="pt-20">
      {/* ... Other sections like Hero ... */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you soon.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form ref={form} onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm">
                           First Name *
                        </label>
                        <Input name="name" required />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">
                           Last Name *
                        </label>
                        <Input name="last_name" required />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Email *</label>
                      <Input name="email" type="email" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Organazation</label>
                      <Input name="subject" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Phone</label>
                      <Input name="phone" type="tel" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Message *</label>
                      <Textarea name="message" rows={5} required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                  {showNotification && (
                    <div
                      className={`p-3 rounded ${
                        notificationType === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {notificationMessage}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-8"
            >
              {/* Contact cards */}
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition">
                    <CardContent className="p-6 flex space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded">
                        <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {info.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400">
                          {info.details}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {info.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ section and CTA here... reuse your existing content, no change needed */}
    </div>
  );
}
