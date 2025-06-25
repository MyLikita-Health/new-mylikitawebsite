"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle,
  Users,
  Building2,
  Award,
  TrendingUp,
  Brain,
  Video,
  Pill,
  Star,
  Quote,
  Zap,
  BarChart3,
  Activity,
  MessageSquare,
  Shield,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { DemoRequestButton } from "@/components/demo-request-button"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  const floatAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const testimonials = [
    {
      quote:
        "MyLikita HMS has transformed our patient management completely. The AI-powered features save us hours daily.",
      name: "Dr. Amina Hassan",
      role: "Chief Medical Officer",
      organization: "Murtala Muhammad Hospital",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote: "The telemedicine platform has allowed us to reach patients in remote areas we never could before.",
      name: "Dr. Chidi Okafor",
      role: "Director of Digital Health",
      organization: "OUMC",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote: "Implementation was seamless and the support team is exceptional. Our efficiency has increased by 60%.",
      name: "Mrs. Fatima Abdullahi",
      role: "Hospital Administrator",
      organization: "Federal Medical Centre",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const blogPosts = [
    {
      title: "AI in African Healthcare: The Future is Now",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing healthcare delivery across African hospitals and clinics.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-15",
      readTime: "5 min read",
    },
    {
      title: "Telemedicine Success Stories from Rural Nigeria",
      excerpt:
        "Real-world case studies showing how telemedicine is bridging healthcare gaps in underserved communities.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-12",
      readTime: "7 min read",
    },
    {
      title: "Digital Transformation in African Hospitals",
      excerpt: "A comprehensive guide to implementing digital health solutions in resource-limited settings.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-10",
      readTime: "6 min read",
    },
  ]

  const trustedClients = [
    { name: "OUMC", location: "Ile-Ife, Nigeria" },
    { name: "PHIMA", location: "Lagos, Nigeria" },
    { name: "Murtala Muhammad Hospital", location: "Kano, Nigeria" },
    { name: "Federal Medical Centre", location: "Abuja, Nigeria" },
    { name: "Lagos University Teaching Hospital", location: "Lagos, Nigeria" },
    { name: "Ahmadu Bello University Hospital", location: "Zaria, Nigeria" },
  ]

  return (
    <div className="overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                🚀 Leading Healthcare Technology in Africa
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-6"
            >
              <span className="text-gradient">Powering Digital</span>
              <br />
              <span className="text-gray-900 dark:text-white">Healthcare in Africa</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
            >
              Transforming healthcare delivery with innovative technology solutions for hospitals, clinics, and medical
              institutions across Africa.
            </motion.p>

            {/* Enhanced Highlight */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Brain className="h-5 w-5" />
                <span className="font-medium">Powered by AI</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Trusted by Hospitals</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Award className="h-5 w-5" />
                <span className="font-medium">Built for Africa</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <DemoRequestButton />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
          variants={floatAnimation}
          animate="animate"
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 dark:bg-blue-700 rounded-full opacity-20"
          variants={floatAnimation}
          animate="animate"
          style={{ animationDelay: "2s" }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-20 w-16 h-16 bg-blue-400 dark:bg-blue-600 rounded-full opacity-20"
          variants={floatAnimation}
          animate="animate"
          style={{ animationDelay: "4s" }}
        ></motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { number: "500+", label: "Healthcare Facilities", icon: Building2 },
              { number: "1M+", label: "Patient Records", icon: Users },
              { number: "50+", label: "Cities Covered", icon: Award },
              { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Enablement Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white"
            >
              AI-Powered Healthcare
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Harness the power of artificial intelligence to revolutionize healthcare delivery, improve patient
              outcomes, and streamline operations.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Consultation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI listens to doctor-patient conversations, automatically summarizes visits, and generates
                    comprehensive SOAP notes, saving valuable time for healthcare providers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Billing</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI-assisted billing suggestions and automated claim validations reduce errors, accelerate
                    reimbursements, and ensure compliance with insurance requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Predictive Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced AI algorithms analyze patient data to predict health risks, optimize treatment plans, and
                    improve preventive care strategies.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <span className="text-xs text-gray-500">Real-time</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy Rate</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="text-xs text-gray-500">Avg. Time</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">2.5min</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Per Consultation</div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">AI Processing</span>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Voice Recognition</span>
                        <span className="text-gray-900 dark:text-white">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full w-full"></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">SOAP Generation</span>
                        <span className="text-gray-900 dark:text-white">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div className="bg-green-600 h-1 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating AI Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full opacity-60"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute bottom-8 left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Telemedicine & Telepharmacy Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              Remote Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Extend your healthcare reach with our comprehensive telemedicine and telepharmacy platforms
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* MediLinka Telemedicine */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-space-grotesk text-gray-900 dark:text-white">MediLinka</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">Telemedicine Platform</p>
                    </div>
                  </div>

                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="MediLinka Telemedicine Interface"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Live Consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      "HD Video Consultations",
                      "Secure Patient Data Sharing",
                      "Remote Health Monitoring",
                      "Digital Prescription Management",
                      "Multi-device Compatibility",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/products#medilinka">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Learn More About MediLinka
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* MyLikita TelePharmacy */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Pill className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                        MyLikita TelePharmacy
                      </h3>
                      <p className="text-green-600 dark:text-green-400 font-medium">Remote Pharmacy Services</p>
                    </div>
                  </div>

                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt="TelePharmacy Interface"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Processing Order</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Remote Prescription Processing",
                      "Medication Delivery Coordination",
                      "Drug Interaction Checking",
                      "Inventory Management",
                      "Patient Medication History",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/products#pharmbooks">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore TelePharmacy
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              Trusted by Leading Health Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join hundreds of healthcare facilities across Africa that trust MyLikita for their digital transformation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {trustedClients.map((client, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{client.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{client.location}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              What Our Users Are Saying
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real feedback from healthcare professionals using MyLikita solutions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
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

      {/* Recent Blogs Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              From Our Blog
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Latest insights and thought leadership in healthcare technology
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link href="/blog">
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white"
            >
              Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              To revolutionize healthcare delivery in Africa by providing cutting-edge technology solutions that improve
              patient outcomes, streamline operations, and empower healthcare professionals with the tools they need to
              deliver exceptional care.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Innovation",
                  description: "Cutting-edge technology solutions designed for African healthcare needs",
                },
                {
                  title: "Impact",
                  description: "Improving patient outcomes and healthcare delivery across the continent",
                },
                { title: "Integration", description: "Seamless integration with existing healthcare infrastructure" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              Our Product Suite
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive healthcare technology solutions designed to meet the unique needs of African healthcare
              institutions.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                name: "MyLikita HMS",
                description: "Complete Electronic Health Record System for comprehensive patient management",
                features: ["Patient Records", "Billing System", "Prescription Management"],
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "MyLikita LIS",
                description: "Laboratory Information System for efficient test management and reporting",
                features: ["Test Setup", "Sample Tracking", "Automated Reporting"],
                color: "from-green-500 to-green-600",
              },
              {
                name: "MediLinka",
                description: "Telemedicine platform enabling remote consultations and patient care",
                features: ["Video Consultations", "Remote Monitoring", "Digital Prescriptions"],
                color: "from-purple-500 to-purple-600",
              },
            ].map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
              Ready to Transform Your Healthcare Facility?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Join hundreds of healthcare institutions across Africa that trust MyLikita for their digital
              transformation.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <DemoRequestButton variant="secondary" />
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
