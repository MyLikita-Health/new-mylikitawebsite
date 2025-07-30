"use client";

import type React from "react";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Heart,
  TestTube,
  Scan,
  Pill,
  Video,
  CheckCircle,
  ArrowRight,
  Users,
  Star,
  Shield,
  Zap,
  Clock,
  BarChart3,
  Send,
  ArrowLeft,
} from "lucide-react";
import hms from "../../../public/hms.jpeg";
import lab from "../../../public/lab.jpeg";
import pharma from "../../../public/pharma.jpeg";
import ris from "../../../public/ris.jpeg";
import { notFound } from "next/navigation";
import med from "../../../public/med.jpeg";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPageClient({ params }: ProductPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orgName: "",
    // orgType: productOrgTypeMap[params.slug as keyof typeof productOrgTypeMap] || "other",
    message: "",
  });
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const productOrgTypeMap = {
    hms: "Hospital",
    labcore: "Laboratory",
    scanris: "Radiology Department",
    pharmabooks: "Pharmacy",
    medilinka: "Telemedicine Provider",
  };

  const products = {
    hms: {
      id: "hms",
      name: "MyLikita HMS",
      orgType: "hospital",
      subtitle: "Electronic Health Record System",
      description:
        "MyLikita HMS is a comprehensive hospital management system designed specifically for African healthcare facilities. It provides complete patient record management, integrated billing, and prescription handling in one unified platform.",
      longDescription:
        "Our flagship Hospital Management System (HMS) revolutionizes healthcare delivery by digitizing every aspect of hospital operations. From patient registration to discharge, MyLikita HMS ensures seamless workflow management, improved patient care, and operational efficiency. Built with African healthcare needs in mind, it supports multiple languages, local payment methods, and integrates with existing healthcare infrastructure.",
      icon: Heart,
      color: "from-blue-500 to-blue-600",
      features: [
        {
          title: "Patient Records Management",
          description:
            "Complete electronic health records with medical history, allergies, and treatment plans",
          icon: Users,
        },
        {
          title: "Integrated Billing System",
          description:
            "Automated billing with insurance claims processing and payment tracking",
          icon: BarChart3,
        },
        {
          title: "Electronic Prescriptions",
          description:
            "Digital prescription management with drug interaction checking",
          icon: Pill,
        },
        {
          title: "Appointment Scheduling",
          description:
            "Smart scheduling system with automated reminders and calendar integration",
          icon: Clock,
        },
        {
          title: "Real-time Analytics",
          description:
            "Comprehensive dashboards and reports for data-driven decision making",
          icon: BarChart3,
        },
        {
          title: "Multi-location Support",
          description:
            "Centralized management for hospital chains and multi-branch facilities",
          icon: Shield,
        },
      ],
      benefits: [
        "Reduce paperwork by 90%",
        "Improve patient care coordination",
        "Streamline billing processes",
        "Enhance data security and compliance",
        "Increase operational efficiency by 60%",
        "Reduce patient wait times by 40%",
      ],
      targetAudience: [
        "General Hospitals",
        "Specialist Clinics",
        "Private Practices",
        "Government Health Centers",
      ],
      pricing: "Starting from ₦50,000/month",
      implementation: "2-4 weeks",
      support: "24/7 technical support",
      image: hms,
      gallery: [
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
      ],
      testimonials: [
        {
          quote:
            "MyLikita HMS transformed our hospital operations completely. Patient satisfaction increased by 80%.",
          name: "Dr. Amina Hassan",
          role: "Chief Medical Officer",
          organization: "Murtala Muhammad Hospital",
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          quote:
            "The billing system alone saved us 20 hours per week. Incredible efficiency gains.",
          name: "Mrs. Kemi Adebayo",
          role: "Hospital Administrator",
          organization: "Lagos General Hospital",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    labcore: {
      id: "labcore",
      name: "LabCore",
      orgType: "laboratory",
      subtitle: "Laboratory Information System",
      description:
        "LabCore is an advanced laboratory management system that streamlines test setup, sample tracking, and automated reporting for medical laboratories across Africa.",
      longDescription:
        "LabCore revolutionizes laboratory operations with intelligent automation and seamless integration capabilities. Designed for the unique challenges of African laboratories, it supports various testing protocols, equipment integration, and quality control measures. From sample collection to result delivery, LabCore ensures accuracy, efficiency, and compliance with international standards.",
      icon: TestTube,
      color: "from-green-500 to-green-600",
      features: [
        {
          title: "Automated Test Setup",
          description:
            "Pre-configured test panels with customizable parameters and protocols",
          icon: Zap,
        },
        {
          title: "Sample Tracking",
          description:
            "Barcode-enabled sample tracking from collection to disposal",
          icon: BarChart3,
        },
        {
          title: "Quality Control",
          description:
            "Comprehensive QC management with statistical analysis and trending",
          icon: Shield,
        },
        {
          title: "Equipment Integration",
          description:
            "Seamless integration with laboratory analyzers and instruments",
          icon: Users,
        },
        {
          title: "Automated Reporting",
          description:
            "Intelligent report generation with customizable templates",
          icon: BarChart3,
        },
        {
          title: "Inventory Management",
          description:
            "Real-time reagent and consumable tracking with automated reordering",
          icon: Clock,
        },
      ],
      benefits: [
        "Reduce test turnaround time by 50%",
        "Minimize human errors by 95%",
        "Improve lab efficiency by 70%",
        "Ensure regulatory compliance",
        "Reduce reagent waste by 30%",
        "Enhance result accuracy",
      ],
      targetAudience: [
        "Medical Laboratories",
        "Hospital Labs",
        "Diagnostic Centers",
        "Research Facilities",
      ],
      pricing: "Starting from ₦35,000/month",
      implementation: "1-3 weeks",
      support: "24/7 technical support",
      image: lab,
      gallery: [
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
      ],
      testimonials: [
        {
          quote:
            "LabCore reduced our turnaround time from 24 hours to 4 hours. Patients are much happier.",
          name: "Dr. Ibrahim Musa",
          role: "Laboratory Director",
          organization: "Central Diagnostic Lab",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    scanris: {
      id: "scanris",
      name: "ScanRIS",
      orgType: "radiology",
      subtitle: "Radiology Information System",
      description:
        "ScanRIS is a complete radiology management system with DICOM image viewer, enabling efficient radiology workflow and advanced image management capabilities.",
      longDescription:
        "ScanRIS transforms radiology departments with comprehensive workflow management and advanced imaging capabilities. Supporting full DICOM compliance, it integrates seamlessly with imaging modalities while providing powerful tools for image analysis, reporting, and collaboration. Built for African healthcare infrastructure, it supports teleradiology and remote consultation capabilities.",
      icon: Scan,
      color: "from-purple-500 to-purple-600",
      features: [
        {
          title: "DICOM Image Viewer",
          description:
            "Advanced DICOM viewer with measurement tools and image enhancement",
          icon: Scan,
        },
        {
          title: "Workflow Management",
          description:
            "Streamlined radiology workflow from order to report delivery",
          icon: BarChart3,
        },
        {
          title: "Image Archiving",
          description:
            "Secure cloud-based image storage with instant retrieval",
          icon: Shield,
        },
        {
          title: "Report Templates",
          description:
            "Customizable reporting templates with voice recognition support",
          icon: Users,
        },
        {
          title: "Teleradiology",
          description:
            "Remote reading capabilities with secure image transmission",
          icon: Video,
        },
        {
          title: "Quality Assurance",
          description:
            "Comprehensive QA tools for image quality and report accuracy",
          icon: CheckCircle,
        },
      ],
      benefits: [
        "Faster image processing by 60%",
        "Improved diagnostic accuracy",
        "Reduced storage costs by 40%",
        "Enhanced collaboration",
        "24/7 remote access capability",
        "Streamlined reporting workflow",
      ],
      targetAudience: [
        "Radiology Departments",
        "Imaging Centers",
        "Hospitals",
        "Teleradiology Services",
      ],
      pricing: "Starting from ₦45,000/month",
      implementation: "2-3 weeks",
      support: "24/7 technical support",
      image: ris,
      gallery: [
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
      ],
      testimonials: [
        {
          quote:
            "ScanRIS enabled us to provide 24/7 radiology services with remote reading capabilities.",
          name: "Dr. Fatima Abdullahi",
          role: "Chief Radiologist",
          organization: "Federal Medical Centre",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    pharmabooks: {
      id: "pharmabooks",
      name: "PharmaBooks",
      orgType: "pharmacy",
      subtitle: "Pharmacy Management System",
      description: "",
      longDescription:
        "PharmaBooks revolutionizes pharmacy operations with intelligent inventory management, automated dispensing workflows, and comprehensive financial tracking. Designed for African pharmacy needs, it supports local suppliers, multiple payment methods, and regulatory compliance. From prescription processing to financial reporting, PharmaBooks ensures accuracy, efficiency, and profitability.",
      icon: Pill,
      color: "from-orange-500 to-orange-600",
      features: [
        {
          title: "Inventory Management",
          description:
            "Real-time stock tracking with automated reorder points and supplier management",
          icon: BarChart3,
        },
        {
          title: "Point of Sale",
          description:
            "Advanced POS system with multiple payment methods and receipt printing",
          icon: Zap,
        },
        {
          title: "Drug Interaction Checking",
          description:
            "Comprehensive drug interaction and allergy checking system",
          icon: Shield,
        },
        {
          title: "Expiry Management",
          description:
            "Automated expiry date tracking with alerts and FEFO dispensing",
          icon: Clock,
        },
        {
          title: "Financial Reporting",
          description:
            "Detailed financial reports with profit analysis and tax compliance",
          icon: BarChart3,
        },
        {
          title: "Prescription Processing",
          description:
            "Electronic prescription processing with insurance claim management",
          icon: Users,
        },
      ],
      benefits: [
        "Reduce medication errors by 98%",
        "Optimize inventory levels",
        "Improve profitability by 25%",
        "Ensure drug safety compliance",
        "Reduce expired stock waste by 80%",
        "Streamline insurance claims",
      ],
      targetAudience: [
        "Hospital Pharmacies",
        "Retail Pharmacies",
        "Pharmaceutical Distributors",
        "Chain Pharmacies",
      ],
      pricing: "Starting from ₦25,000/month",
      implementation: "1-2 weeks",
      support: "24/7 technical support",
      image: pharma,
      gallery: [
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
      ],
      testimonials: [
        {
          quote:
            "PharmaBooks helped us reduce expired medications by 80% and increase profits by 25%.",
          name: "Pharm. Aisha Garba",
          role: "Chief Pharmacist",
          organization: "City Pharmacy Chain",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    medilinka: {
      id: "medilinka",
      name: "MediLinka",
      orgType: "telemedicine",
      subtitle: "Telemedicine & TelePharmacy Platform",
      description:
        "MediLinka is an advanced telemedicine and telepharmacy platform enabling remote patient care, digital consultations, and medication delivery coordination.",
      longDescription:
        "MediLinka bridges the healthcare gap in Africa by providing comprehensive telemedicine and telepharmacy services. Supporting HD video consultations, remote patient monitoring, and medication delivery coordination, it enables healthcare providers to reach patients in remote areas. With integrated payment systems and multi-device support, MediLinka makes quality healthcare accessible to all.",
      icon: Video,
      color: "from-pink-500 to-pink-600",
      features: [
        {
          title: "HD Video Consultations",
          description:
            "Crystal clear video calls with screen sharing and recording capabilities",
          icon: Video,
        },
        {
          title: "Remote Monitoring",
          description:
            "Real-time patient vital signs monitoring with IoT device integration",
          icon: BarChart3,
        },
        {
          title: "Digital Prescriptions",
          description:
            "Electronic prescription generation with direct pharmacy integration",
          icon: Pill,
        },
        {
          title: "TelePharmacy Services",
          description:
            "Remote pharmaceutical care with medication delivery coordination",
          icon: Users,
        },
        {
          title: "Secure Messaging",
          description:
            "HIPAA-compliant messaging system for patient-provider communication",
          icon: Shield,
        },
        {
          title: "Payment Integration",
          description:
            "Multiple payment options including mobile money and insurance billing",
          icon: Zap,
        },
      ],
      benefits: [
        "Expand patient reach by 300%",
        "Reduce travel costs for patients",
        "Improve access to specialists",
        "Enable continuous care monitoring",
        "Reduce no-show rates by 70%",
        "24/7 healthcare accessibility",
      ],
      targetAudience: [
        "Telemedicine Providers",
        "Remote Clinics",
        "Specialist Consultants",
        "Rural Healthcare",
      ],
      pricing: "Starting from ₦30,000/month",
      implementation: "1-2 weeks",
      support: "24/7 technical support",
      image: med,
      gallery: [
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
        "/placeholder.svg?height=60&width=60",
      ],
      testimonials: [
        {
          quote:
            "MediLinka allowed us to serve rural communities we never could reach before. Amazing impact!",
          name: "Dr. Chidi Okafor",
          role: "Director of Digital Health",
          organization: "OUMC Telemedicine",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
  };

  const product = products[params.slug as keyof typeof products];

  if (!product) {
    notFound();
  }
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_z335l2i",
        "template_whovkss",
        form.current,
        "TcE2MBOw4r4Mp-jYi"
      )
      .then(
        (result) => {
          setNotificationMessage("Message sent successfully!");
          setNotificationType("success");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
          form.current?.reset();
          setIsSubmitted(true);
          setIsSubmitting(false);
          console.log(result.text);
        },
        (error) => {
          setNotificationMessage(
            "Failed to send the message. Please try again."
          );
          setNotificationType("danger");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
          setIsSubmitting(false);
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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.orgName;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 p-0"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mr-6`}
                  >
                    <product.icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                      {product.name}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Badge variant="secondary" className="px-4 py-2">
                    {product.pricing}
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    {product.implementation} Implementation
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    {product.support}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${product.color} text-white hover:opacity-90 transition-opacity`}
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Brochure
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl overflow-hidden">
                  <div className="relative h-80">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} Interface`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
                Product Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.longDescription}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {product.benefits.slice(0, 3).map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-0 shadow-lg text-center p-6"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {benefit}
                  </p>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive features designed to meet your specific healthcare
              needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {product.features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {product.testimonials && product.testimonials.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
                What Our Users Say
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {product.testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            {testimonial.organization}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Interest Form */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
                Interested in {product.name}?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Fill out the form below and our team will contact you within 24
                hours to discuss your needs.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Thank You for Your Interest!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our team will contact you within 24 hours to discuss{" "}
                        {product.name} and how it can benefit your organization.
                      </p>
                    </div>
                  ) : (
                    <form
                      ref={form}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name" // Add name attribute
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email" // Add name attribute
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone" // Add name attribute
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="orgType">Organization Type</Label>
                          <div className="flex items-center h-10 px-3 py-2 text-sm border rounded-md bg-gray-100/50 dark:bg-gray-800/50">
                            {productOrgTypeMap[
                              product.id as keyof typeof productOrgTypeMap
                            ] || "Other"}
                          </div>
                          <input
                            type="hidden"
                            name="orgType"
                            value={
                              productOrgTypeMap[
                                product.id as keyof typeof productOrgTypeMap
                              ] || "other"
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="orgName">Organization Name *</Label>
                        <Input
                          id="orgName"
                          name="orgName" // Add name attribute
                          value={formData.orgName}
                          onChange={(e) =>
                            handleInputChange("orgName", e.target.value)
                          }
                          placeholder="Enter your organization name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">
                          Tell us about your needs
                        </Label>
                        <Textarea
                          id="message"
                          name="message" // Add name attribute
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder={`How do you plan to use ${product.name}? What specific challenges are you looking to solve?`}
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full bg-gradient-to-r ${product.color} text-white hover:opacity-90 transition-opacity py-3`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Interest
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
