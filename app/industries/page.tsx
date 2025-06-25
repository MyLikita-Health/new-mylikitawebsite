"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  Building2,
  TestTube2,
  Stethoscope,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function IndustriesPage() {
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

  const industries = [
    {
      id: "clinics",
      name: "Clinics",
      description: "Comprehensive solutions for private and public clinics to streamline patient care and operations.",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
      image: "/placeholder.svg?height=300&width=400",
      solutions: ["MyLikita HMS", "MediLinka", "PharmaBooks"],
      benefits: [
        "Reduce patient wait times by 40%",
        "Improve appointment scheduling efficiency",
        "Streamline billing and insurance claims",
        "Enhance patient record management",
      ],
      challenges: [
        "Manual record keeping",
        "Inefficient appointment scheduling",
        "Complex billing processes",
        "Limited patient engagement tools",
      ],
      stats: {
        facilities: "200+",
        patients: "500K+",
        efficiency: "45%",
      },
    },
    {
      id: "hospitals",
      name: "General & Specialist Hospitals",
      description: "End-to-end hospital management solutions for comprehensive healthcare delivery.",
      icon: Building2,
      color: "from-green-500 to-green-600",
      image: "/placeholder.svg?height=300&width=400",
      solutions: ["MyLikita HMS", "ScanRIS", "LabCore", "PharmaBooks", "MediLinka"],
      benefits: [
        "Integrate all hospital departments",
        "Improve patient safety and outcomes",
        "Optimize resource utilization",
        "Enhance staff productivity",
      ],
      challenges: [
        "Departmental silos",
        "Complex patient workflows",
        "Staff coordination issues",
        "Regulatory compliance",
      ],
      stats: {
        facilities: "150+",
        patients: "2M+",
        efficiency: "60%",
      },
    },
    {
      id: "labs-diagnostics",
      name: "Labs & Diagnostics",
      description: "Specialized laboratory management systems for accurate and efficient diagnostic services.",
      icon: TestTube2,
      color: "from-purple-500 to-purple-600",
      image: "/placeholder.svg?height=300&width=400",
      solutions: ["LabCore", "ScanRIS", "MyLikita HMS"],
      benefits: [
        "Reduce test turnaround time by 50%",
        "Minimize sample tracking errors",
        "Automate quality control processes",
        "Improve lab-clinic communication",
      ],
      challenges: [
        "Manual sample tracking",
        "Delayed result reporting",
        "Quality control issues",
        "Equipment integration",
      ],
      stats: {
        facilities: "100+",
        tests: "10M+",
        efficiency: "55%",
      },
    },
    {
      id: "government-health",
      name: "Government Health Agencies",
      description: "Scalable solutions for public health management and population health monitoring.",
      icon: Shield,
      color: "from-red-500 to-red-600",
      image: "/placeholder.svg?height=300&width=400",
      solutions: ["MyLikita HMS", "LabCore", "MediLinka", "ScanRIS"],
      benefits: [
        "Centralized health data management",
        "Population health insights",
        "Improved resource allocation",
        "Enhanced emergency response",
      ],
      challenges: [
        "Fragmented health data",
        "Limited resource visibility",
        "Complex reporting requirements",
        "Multi-facility coordination",
      ],
      stats: {
        facilities: "50+",
        population: "5M+",
        coverage: "80%",
      },
    },
    {
      id: "regulatory-agencies",
      name: "Regulatory Agencies",
      description: "Compliance and monitoring solutions for healthcare regulatory bodies and oversight organizations.",
      icon: Users,
      color: "from-teal-500 to-teal-600",
      image: "/placeholder.svg?height=300&width=400",
      solutions: ["MyLikita HMS", "LabCore", "ScanRIS", "PharmaBooks"],
      benefits: [
        "Automated compliance monitoring",
        "Real-time regulatory reporting",
        "Streamlined audit processes",
        "Enhanced data transparency",
      ],
      challenges: [
        "Manual compliance tracking",
        "Complex reporting requirements",
        "Data standardization issues",
        "Multi-stakeholder coordination",
      ],
      stats: {
        agencies: "10+",
        facilities: "1000+",
        compliance: "95%",
      },
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white"
            >
              Industries We <span className="text-gradient">Serve</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Tailored healthcare technology solutions for diverse healthcare sectors across Africa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <industry.icon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                      {industry.name}
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {Object.entries(industry.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Solutions */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Our Solutions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.solutions.map((solution, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {solution}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/industries/${industry.id}`}>
                    <Button
                      className={`bg-gradient-to-r ${industry.color} text-white hover:opacity-90 transition-opacity`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <Image
                          src={industry.image || "/placeholder.svg"}
                          alt={`${industry.name} Solutions`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                              Key Benefits
                            </h4>
                            <ul className="space-y-2">
                              {industry.benefits.slice(0, 2).map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Clock className="h-4 w-4 text-orange-500 mr-2" />
                              Challenges Solved
                            </h4>
                            <ul className="space-y-2">
                              {industry.challenges.slice(0, 2).map((challenge, idx) => (
                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {challenge}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real results from healthcare institutions across Africa
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                metric: "90%",
                description: "Reduction in paperwork for clinics using MyLikita HMS",
                icon: "🚀",
                color: "text-green-600",
              },
              {
                metric: "50%",
                description: "Faster lab result turnaround with LabCore",
                icon: "⚡",
                color: "text-blue-600",
              },
              {
                metric: "99.9%",
                description: "System uptime across all our healthcare partners",
                icon: "🏆",
                color: "text-purple-600",
              },
            ].map((story, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{story.icon}</span>
                    </div>
                    <div className={`text-4xl font-bold mb-3 ${story.color}`}>{story.metric}</div>
                    <p className="text-gray-600 dark:text-gray-300">{story.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Transform Your Industry
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Join healthcare institutions across Africa that have revolutionized their operations with MyLikita.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-4 text-lg font-semibold">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Case Studies
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
