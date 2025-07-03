"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import hms from "../public/hms.jpeg"
import {
  Building2,
  TestTube2,
  Stethoscope,
  Shield,
  Users,
  CheckCircle,
  Clock,
  Star,
  ArrowLeft,
  Send,
  Heart,
  TestTube,
  Scan,
  Pill,
  Video,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { notFound } from "next/navigation"

const industries = {
  clinics: {
    id: "clinics",
    name: "Clinics",
    subtitle: "Private & Public Healthcare Clinics",
    description: "Comprehensive digital solutions transforming clinic operations and patient care delivery.",
    longDescription:
      "MyLikita empowers clinics across Africa with integrated digital solutions that streamline operations, improve patient outcomes, and enhance operational efficiency. From small private practices to large multi-specialty clinics, our solutions are designed to meet the unique challenges of African healthcare delivery.",
    icon: Stethoscope,
    color: "from-blue-500 to-blue-600",
    image: "/placeholder.svg?height=400&width=600",
    solutions: [
      {
        name: "MyLikita HMS",
        description: "Complete patient record management and clinic operations",
        icon: Heart,
        benefits: ["Digital patient records", "Appointment scheduling", "Billing automation", "Insurance processing"],
      },
      {
        name: "MediLinka",
        description: "Telemedicine platform for remote consultations",
        icon: Video,
        benefits: ["Video consultations", "Remote monitoring", "Digital prescriptions", "Patient engagement"],
      },
      {
        name: "PharmaBooks",
        description: "Integrated pharmacy management for clinic pharmacies",
        icon: Pill,
        benefits: [
          "Inventory management",
          "Prescription processing",
          "Drug interaction checking",
          "Financial tracking",
        ],
      },
    ],
    challenges: [
      {
        title: "Manual Record Keeping",
        description: "Paper-based systems leading to inefficiencies and errors",
        solution: "Digital patient records with instant access and backup",
      },
      {
        title: "Appointment Management",
        description: "Scheduling conflicts and patient no-shows",
        solution: "Smart scheduling with automated reminders and confirmations",
      },
      {
        title: "Billing Complexities",
        description: "Manual billing processes and insurance claim delays",
        solution: "Automated billing with integrated insurance processing",
      },
      {
        title: "Limited Patient Reach",
        description: "Geographic constraints limiting patient access",
        solution: "Telemedicine capabilities extending care to remote areas",
      },
    ],
    impact: {
      efficiency: "45% increase in operational efficiency",
      waitTime: "40% reduction in patient wait times",
      paperwork: "90% reduction in paperwork",
      satisfaction: "85% improvement in patient satisfaction",
    },
    caseStudies: [
      {
        title: "Lagos Family Clinic Transformation",
        organization: "Lagos Family Clinic",
        challenge: "Managing 200+ daily patients with paper records",
        solution: "Implemented MyLikita HMS with integrated billing",
        results: ["50% faster patient processing", "Zero lost records", "30% revenue increase"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Rural Clinic Telemedicine Success",
        organization: "Kano Rural Health Center",
        challenge: "Limited specialist access for rural patients",
        solution: "Deployed MediLinka for specialist consultations",
        results: [
          "300% increase in specialist consultations",
          "80% reduction in travel costs",
          "95% patient satisfaction",
        ],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    testimonials: [
      {
        quote: "MyLikita HMS transformed our clinic operations. We now serve 50% more patients with the same staff.",
        name: "Dr. Aisha Bello",
        role: "Medical Director",
        organization: "Abuja Medical Clinic",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        quote: "The telemedicine platform helped us reach patients we never could before. It's been life-changing.",
        name: "Dr. Ibrahim Sani",
        role: "Chief Medical Officer",
        organization: "Kaduna Health Center",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    stats: {
      facilities: "200+",
      patients: "500K+",
      efficiency: "45%",
      satisfaction: "85%",
    },
  },
  hospitals: {
    id: "hospitals",
    name: "General & Specialist Hospitals",
    subtitle: "Comprehensive Hospital Management",
    description: "End-to-end digital transformation solutions for hospitals of all sizes across Africa.",
    longDescription:
      "MyLikita provides comprehensive digital infrastructure for hospitals, integrating all departments and workflows into a unified system. From emergency departments to specialized units, our solutions ensure seamless operations, improved patient safety, and enhanced clinical outcomes while maintaining compliance with healthcare standards.",
    icon: Building2,
    color: "from-green-500 to-green-600",
    image: hms,
    solutions: [
      {
        name: "MyLikita HMS",
        description: "Complete hospital management and patient records",
        icon: Heart,
        benefits: [
          "Multi-department integration",
          "Patient flow management",
          "Clinical decision support",
          "Quality metrics",
        ],
      },
      {
        name: "ScanRIS",
        description: "Radiology information system with DICOM support",
        icon: Scan,
        benefits: ["Image management", "Radiology workflow", "Teleradiology", "Report generation"],
      },
      {
        name: "LabCore",
        description: "Laboratory information system for all lab operations",
        icon: TestTube,
        benefits: ["Sample tracking", "Result management", "Quality control", "Equipment integration"],
      },
      {
        name: "PharmaBooks",
        description: "Hospital pharmacy management and inventory",
        icon: Pill,
        benefits: ["Drug inventory", "Prescription management", "Cost control", "Regulatory compliance"],
      },
      {
        name: "MediLinka",
        description: "Telemedicine for remote consultations and follow-ups",
        icon: Video,
        benefits: ["Remote consultations", "Patient monitoring", "Specialist access", "Discharge follow-up"],
      },
    ],
    challenges: [
      {
        title: "Departmental Silos",
        description: "Isolated systems preventing information sharing",
        solution: "Integrated platform connecting all hospital departments",
      },
      {
        title: "Patient Flow Management",
        description: "Inefficient patient routing and bed management",
        solution: "Real-time patient tracking and automated workflow management",
      },
      {
        title: "Clinical Documentation",
        description: "Time-consuming manual documentation processes",
        solution: "Electronic health records with voice recognition and templates",
      },
      {
        title: "Resource Optimization",
        description: "Inefficient allocation of staff and equipment",
        solution: "Analytics-driven resource planning and scheduling",
      },
    ],
    impact: {
      efficiency: "60% increase in operational efficiency",
      safety: "75% reduction in medical errors",
      throughput: "40% increase in patient throughput",
      satisfaction: "90% improvement in staff satisfaction",
    },
    caseStudies: [
      {
        title: "Federal Medical Centre Digital Transformation",
        organization: "Federal Medical Centre, Abuja",
        challenge: "Managing 500-bed hospital with paper-based systems",
        solution: "Complete MyLikita suite implementation",
        results: ["60% faster patient processing", "Zero medication errors", "50% reduction in readmissions"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Teaching Hospital Laboratory Automation",
        organization: "University College Hospital, Ibadan",
        challenge: "Manual lab processes causing delays and errors",
        solution: "LabCore implementation with equipment integration",
        results: ["70% faster lab results", "95% accuracy improvement", "50% cost reduction"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    testimonials: [
      {
        quote:
          "MyLikita transformed our 500-bed hospital. Patient safety improved dramatically with zero medication errors.",
        name: "Dr. Fatima Abdullahi",
        role: "Chief Medical Director",
        organization: "Federal Medical Centre",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        quote: "The integrated system connected all our departments. Communication and efficiency improved by 60%.",
        name: "Dr. Chidi Okafor",
        role: "Medical Director",
        organization: "Lagos University Teaching Hospital",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    stats: {
      facilities: "150+",
      patients: "2M+",
      efficiency: "60%",
      safety: "75%",
    },
  },
  "labs-diagnostics": {
    id: "labs-diagnostics",
    name: "Labs & Diagnostics",
    subtitle: "Medical Laboratories & Diagnostic Centers",
    description: "Advanced laboratory management solutions for accurate and efficient diagnostic services.",
    longDescription:
      "MyLikita revolutionizes laboratory operations with intelligent automation, quality control, and seamless integration capabilities. Our solutions support various testing protocols, equipment integration, and compliance with international standards, ensuring accurate results and efficient workflows.",
    icon: TestTube2,
    color: "from-purple-500 to-purple-600",
    image: "/placeholder.svg?height=400&width=600",
    solutions: [
      {
        name: "LabCore",
        description: "Complete laboratory information system",
        icon: TestTube,
        benefits: ["Sample tracking", "Automated reporting", "Quality control", "Equipment integration"],
      },
      {
        name: "ScanRIS",
        description: "Radiology and imaging management",
        icon: Scan,
        benefits: ["DICOM support", "Image archiving", "Report templates", "Teleradiology"],
      },
      {
        name: "MyLikita HMS",
        description: "Integration with hospital systems",
        icon: Heart,
        benefits: ["Order management", "Result delivery", "Patient records", "Billing integration"],
      },
    ],
    challenges: [
      {
        title: "Sample Tracking Errors",
        description: "Manual tracking leading to lost samples and delays",
        solution: "Barcode-enabled automated sample tracking system",
      },
      {
        title: "Result Turnaround Time",
        description: "Slow manual processes affecting patient care",
        solution: "Automated workflows and real-time result processing",
      },
      {
        title: "Quality Control",
        description: "Inconsistent quality control procedures",
        solution: "Comprehensive QC management with statistical analysis",
      },
      {
        title: "Equipment Integration",
        description: "Isolated lab equipment and manual data entry",
        solution: "Seamless integration with laboratory analyzers",
      },
    ],
    impact: {
      turnaround: "50% reduction in test turnaround time",
      accuracy: "95% improvement in result accuracy",
      efficiency: "55% increase in lab efficiency",
      errors: "90% reduction in sample tracking errors",
    },
    caseStudies: [
      {
        title: "Central Diagnostic Lab Automation",
        organization: "Central Diagnostic Laboratory, Lagos",
        challenge: "Processing 1000+ samples daily with manual systems",
        solution: "LabCore implementation with full automation",
        results: ["60% faster processing", "Zero sample mix-ups", "40% cost reduction"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Regional Lab Network Integration",
        organization: "Northern Nigeria Lab Network",
        challenge: "Coordinating results across 15 lab locations",
        solution: "Centralized LabCore system with remote access",
        results: ["Real-time result sharing", "50% faster reporting", "Unified quality standards"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    testimonials: [
      {
        quote: "LabCore reduced our turnaround time from 24 hours to 4 hours. Patients and doctors are much happier.",
        name: "Dr. Ibrahim Musa",
        role: "Laboratory Director",
        organization: "Central Diagnostic Lab",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        quote: "The automated quality control features helped us achieve international accreditation standards.",
        name: "Dr. Amina Hassan",
        role: "Chief Pathologist",
        organization: "Federal Medical Laboratory",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    stats: {
      facilities: "100+",
      tests: "10M+",
      efficiency: "55%",
      accuracy: "95%",
    },
  },
  "government-health": {
    id: "government-health",
    name: "Government Health Agencies",
    subtitle: "Public Health Management & Oversight",
    description: "Scalable solutions for public health management and population health monitoring.",
    longDescription:
      "MyLikita supports government health agencies with comprehensive solutions for population health management, regulatory oversight, and public health monitoring. Our systems enable centralized data management, real-time reporting, and evidence-based policy making for improved public health outcomes.",
    icon: Shield,
    color: "from-red-500 to-red-600",
    image: "/placeholder.svg?height=400&width=600",
    solutions: [
      {
        name: "MyLikita HMS",
        description: "Centralized health data management across facilities",
        icon: Heart,
        benefits: [
          "Population health tracking",
          "Multi-facility oversight",
          "Standardized reporting",
          "Resource allocation",
        ],
      },
      {
        name: "LabCore",
        description: "Public health laboratory coordination",
        icon: TestTube,
        benefits: ["Disease surveillance", "Outbreak monitoring", "Quality standardization", "Data aggregation"],
      },
      {
        name: "MediLinka",
        description: "Telemedicine for underserved populations",
        icon: Video,
        benefits: ["Rural healthcare access", "Specialist consultations", "Health education", "Emergency response"],
      },
      {
        name: "ScanRIS",
        description: "Regional imaging and diagnostic coordination",
        icon: Scan,
        benefits: ["Centralized imaging", "Teleradiology network", "Resource sharing", "Quality assurance"],
      },
    ],
    challenges: [
      {
        title: "Fragmented Health Data",
        description: "Isolated systems preventing comprehensive health monitoring",
        solution: "Centralized data platform with standardized reporting",
      },
      {
        title: "Resource Allocation",
        description: "Inefficient distribution of healthcare resources",
        solution: "Data-driven resource planning and allocation tools",
      },
      {
        title: "Public Health Monitoring",
        description: "Limited visibility into population health trends",
        solution: "Real-time health surveillance and analytics dashboard",
      },
      {
        title: "Rural Healthcare Access",
        description: "Limited healthcare services in remote areas",
        solution: "Telemedicine network connecting rural and urban facilities",
      },
    ],
    impact: {
      coverage: "80% increase in population health coverage",
      response: "60% faster emergency response times",
      efficiency: "50% improvement in resource utilization",
      monitoring: "Real-time health surveillance across regions",
    },
    caseStudies: [
      {
        title: "State Health Ministry Digital Transformation",
        organization: "Kaduna State Ministry of Health",
        challenge: "Coordinating health services across 200+ facilities",
        solution: "Integrated MyLikita platform for state-wide coordination",
        results: ["Unified health data", "50% faster reporting", "Improved resource allocation"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "National Disease Surveillance System",
        organization: "Nigeria Centre for Disease Control",
        challenge: "Real-time disease monitoring and outbreak response",
        solution: "LabCore network for laboratory surveillance",
        results: ["Real-time disease tracking", "Faster outbreak detection", "Coordinated response"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    testimonials: [
      {
        quote:
          "MyLikita enabled us to monitor health trends across our entire state in real-time. Game-changing for public health.",
        name: "Dr. Amina Kano",
        role: "Commissioner for Health",
        organization: "Kano State Ministry of Health",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        quote: "The integrated system helped us respond to health emergencies 60% faster with better coordination.",
        name: "Dr. Bola Adebayo",
        role: "Director General",
        organization: "Lagos State Health Service Commission",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    stats: {
      facilities: "50+",
      population: "5M+",
      coverage: "80%",
      response: "60%",
    },
  },
  "regulatory-agencies": {
    id: "regulatory-agencies",
    name: "Regulatory Agencies",
    subtitle: "Healthcare Regulatory Bodies & Oversight",
    description: "Compliance and monitoring solutions for healthcare regulatory bodies and oversight organizations.",
    longDescription:
      "MyLikita empowers regulatory agencies with comprehensive tools for healthcare oversight, compliance monitoring, and quality assurance. Our solutions enable automated compliance tracking, real-time reporting, and streamlined audit processes to ensure healthcare standards across all facilities.",
    icon: Users,
    color: "from-teal-500 to-teal-600",
    image: "/placeholder.svg?height=400&width=600",
    solutions: [
      {
        name: "MyLikita HMS",
        description: "Compliance monitoring and facility oversight",
        icon: Heart,
        benefits: ["Compliance tracking", "Audit trails", "Quality metrics", "Standardized reporting"],
      },
      {
        name: "LabCore",
        description: "Laboratory quality assurance and standards",
        icon: TestTube,
        benefits: [
          "Quality control monitoring",
          "Proficiency testing",
          "Accreditation support",
          "Standards compliance",
        ],
      },
      {
        name: "ScanRIS",
        description: "Imaging quality and safety oversight",
        icon: Scan,
        benefits: ["Quality assurance", "Safety monitoring", "Equipment compliance", "Radiation safety"],
      },
      {
        name: "PharmaBooks",
        description: "Pharmacy regulation and drug safety monitoring",
        icon: Pill,
        benefits: ["Drug safety tracking", "Inventory monitoring", "Prescription oversight", "Adverse event reporting"],
      },
    ],
    challenges: [
      {
        title: "Manual Compliance Tracking",
        description: "Time-consuming manual audits and inspections",
        solution: "Automated compliance monitoring with real-time alerts",
      },
      {
        title: "Data Standardization",
        description: "Inconsistent reporting formats across facilities",
        solution: "Standardized data collection and reporting templates",
      },
      {
        title: "Audit Efficiency",
        description: "Lengthy audit processes and delayed reporting",
        solution: "Digital audit tools with automated report generation",
      },
      {
        title: "Multi-facility Oversight",
        description: "Difficulty monitoring multiple healthcare facilities",
        solution: "Centralized dashboard for real-time facility monitoring",
      },
    ],
    impact: {
      compliance: "95% improvement in compliance rates",
      audits: "70% faster audit processes",
      reporting: "Real-time regulatory reporting",
      transparency: "Enhanced data transparency and accountability",
    },
    caseStudies: [
      {
        title: "National Health Regulatory Authority",
        organization: "Federal Ministry of Health, Nigeria",
        challenge: "Monitoring compliance across 1000+ healthcare facilities",
        solution: "Integrated MyLikita platform for regulatory oversight",
        results: ["95% compliance rate", "50% faster inspections", "Real-time monitoring"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Pharmacy Regulatory Board Digitization",
        organization: "Pharmacists Council of Nigeria",
        challenge: "Tracking pharmacy compliance and drug safety",
        solution: "PharmaBooks integration for regulatory monitoring",
        results: ["Automated compliance tracking", "Real-time drug safety alerts", "Streamlined licensing"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    testimonials: [
      {
        quote:
          "MyLikita transformed our regulatory oversight. We now have real-time visibility into all healthcare facilities.",
        name: "Dr. Adamu Ibrahim",
        role: "Director General",
        organization: "National Health Insurance Scheme",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        quote: "The automated compliance monitoring reduced our audit time by 70% while improving accuracy.",
        name: "Pharm. Fatima Garba",
        role: "Registrar",
        organization: "Pharmacists Council of Nigeria",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    stats: {
      agencies: "10+",
      facilities: "1000+",
      compliance: "95%",
      efficiency: "70%",
    },
  },
}

interface IndustryPageProps {
  params: {
    slug: string
  }
}

export default function IndustryPageClient({ params }: IndustryPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    organizationType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const industry = industries[params.slug as keyof typeof industries]

  if (!industry) {
    notFound()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const isFormValid = formData.name && formData.email && formData.organization

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-6xl mx-auto" initial="initial" animate="animate" variants={staggerChildren}>
            <motion.div variants={fadeInUp} className="mb-6">
              <Link href="/industries">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Industries
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mr-6`}
                  >
                    <industry.icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                      {industry.name}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">{industry.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {industry.longDescription}
                </p>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(industry.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl overflow-hidden">
                  <div className="relative h-80">
                    <Image
                      src={industry.image || "/placeholder.svg"}
                      alt={`${industry.name} Solutions`}
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

      {/* Solutions Section */}
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
              Our Solutions for {industry.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technology solutions designed specifically for your industry needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {industry.solutions.map((solution, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <solution.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{solution.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenges & Solutions */}
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
              Challenges We Solve
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding your unique challenges and providing targeted solutions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {industry.challenges.map((challenge, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-900 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{challenge.description}</p>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-green-700 dark:text-green-300 text-sm font-medium">{challenge.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
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
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world examples of transformation in {industry.name.toLowerCase()}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {industry.caseStudies.map((caseStudy, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={caseStudy.image || "/placeholder.svg"}
                      alt={caseStudy.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{caseStudy.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                      {caseStudy.organization}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Challenge:</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Solution:</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Results:</h4>
                        <ul className="space-y-1">
                          {caseStudy.results.map((result, idx) => (
                            <li key={idx} className="text-green-600 dark:text-green-400 text-sm flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {industry.testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
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
                        <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.organization}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
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
                Transform Your {industry.name}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Ready to revolutionize your operations? Let's discuss how MyLikita can help your organization.
              </p>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
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
                        Our industry specialist will contact you within 24 hours to discuss how MyLikita can transform
                        your {industry.name.toLowerCase()}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
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
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="organizationType">Organization Type</Label>
                          <Select onValueChange={(value) => handleInputChange("organizationType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="clinic">Clinic</SelectItem>
                              <SelectItem value="laboratory">Laboratory</SelectItem>
                              <SelectItem value="pharmacy">Pharmacy</SelectItem>
                              <SelectItem value="government">Government Agency</SelectItem>
                              <SelectItem value="regulatory">Regulatory Body</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="organization">Organization Name *</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          placeholder="Enter your organization name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Tell us about your needs</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={`What specific challenges are you facing in ${industry.name.toLowerCase()}? How can MyLikita help transform your operations?`}
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full bg-gradient-to-r ${industry.color} text-white hover:opacity-90 transition-opacity py-3`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Get Industry Consultation
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
  )
}
