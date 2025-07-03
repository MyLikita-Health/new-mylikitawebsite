"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Heart,
  TestTube,
  Scan,
  Pill,
  Users,
  Video,
  CheckCircle,
  ArrowRight,
  Monitor,
  Database,
  Shield,
} from "lucide-react"
import hms from "../../public/hms.jpeg"
import pharma from "../../public/pharma.jpeg"
import med from "../../public/med.jpeg"
import lab from "../../public/lab.jpeg";
import ris from "../../public/ris.jpeg";
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
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

  const products = [
    {
      id: "hms",
      name: "MyLikita HMS",
      subtitle: "Electronic Health Record System",
      description:
        "Comprehensive hospital management system designed for African healthcare facilities, providing complete patient record management, billing, and prescription handling.",
      icon: Heart,
      color: "from-blue-500 to-blue-600",
      features: [
        "Complete Patient Records Management",
        "Integrated Billing System",
        "Electronic Prescription Management",
        "Appointment Scheduling",
        "Insurance Claims Processing",
        "Multi-location Support",
        "Real-time Analytics Dashboard",
        "Mobile-responsive Interface",
      ],
      targetAudience: [
        "General Hospitals",
        "Specialist Clinics",
        "Private Practices",
        "Government Health Centers",
      ],
      benefits: [
        "Reduce paperwork by 90%",
        "Improve patient care coordination",
        "Streamline billing processes",
        "Enhance data security and compliance",
      ],
      image: hms,
    },
    {
      id: "labcore",
      name: "LabCore",
      subtitle: "Laboratory Information System",
      description:
        "Advanced laboratory management system that streamlines test setup, sample tracking, and automated reporting for medical laboratories.",
      icon: TestTube,
      color: "from-green-500 to-green-600",
      features: [
        "Automated Test Setup",
        "Sample Tracking & Barcoding",
        "Quality Control Management",
        "Automated Report Generation",
        "Integration with Lab Equipment",
        "Inventory Management",
        "Turnaround Time Monitoring",
        "External Lab Integration",
      ],
      targetAudience: [
        "Medical Laboratories",
        "Hospital Labs",
        "Diagnostic Centers",
        "Research Facilities",
      ],
      benefits: [
        "Reduce test turnaround time by 50%",
        "Minimize human errors",
        "Improve lab efficiency",
        "Ensure regulatory compliance",
      ],
      image: lab,
    },
    {
      id: "scanris",
      name: "ScanRIS",
      subtitle: "Radiology Information System",
      description:
        "Complete radiology management system with DICOM image viewer, enabling efficient radiology workflow and image management.",
      icon: Scan,
      color: "from-purple-500 to-purple-600",
      features: [
        "DICOM Image Viewer",
        "Radiology Workflow Management",
        "Image Storage & Archiving",
        "Report Templates",
        "Integration with Modalities",
        "Teleradiology Support",
        "Quality Assurance Tools",
        "Multi-format Image Support",
      ],
      targetAudience: [
        "Radiology Departments",
        "Imaging Centers",
        "Hospitals",
        "Teleradiology Services",
      ],
      benefits: [
        "Faster image processing",
        "Improved diagnostic accuracy",
        "Reduced storage costs",
        "Enhanced collaboration",
      ],
      image: ris,
    },
    {
      id: "pharmabooks",
      name: "PharmaBooks",
      subtitle: "Pharmacy Management System",
      description:
        "Comprehensive pharmacy accounting and inventory management system designed for hospital pharmacies and retail outlets.",
      icon: Pill,
      color: "from-orange-500 to-orange-600",
      features: [
        "Inventory Management",
        "Point of Sale System",
        "Drug Interaction Checking",
        "Expiry Date Tracking",
        "Supplier Management",
        "Financial Reporting",
        "Prescription Processing",
        "Regulatory Compliance",
      ],
      targetAudience: [
        "Hospital Pharmacies",
        "Retail Pharmacies",
        "Pharmaceutical Distributors",
        "Chain Pharmacies",
      ],
      benefits: [
        "Reduce medication errors",
        "Optimize inventory levels",
        "Improve profitability",
        "Ensure drug safety",
      ],
      image: pharma,
    },
    {
      id: "medilinka",
      name: "MediLinka",
      subtitle: "Telemedicine & TelePharmacy Platform",
      description:
        "Advanced telemedicine and telepharmacy platform enabling remote patient care, digital consultations, and medication delivery coordination.",
      icon: Video,
      color: "from-pink-500 to-pink-600",
      features: [
        "HD Video Consultations",
        "Secure Messaging",
        "Digital Prescriptions",
        "Remote Patient Monitoring",
        "TelePharmacy Services",
        "Appointment Scheduling",
        "Payment Integration",
        "Multi-device Support",
      ],
      targetAudience: [
        "Telemedicine Providers",
        "Remote Clinics",
        "Specialist Consultants",
        "Rural Healthcare",
      ],
      benefits: [
        "Expand patient reach",
        "Reduce travel costs",
        "Improve access to specialists",
        "Enable continuous care",
      ],
      image: med,
    },
  ];

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
              Our <span className="text-gradient">Product Suite</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Comprehensive healthcare technology solutions designed to meet the unique needs of African healthcare
              institutions.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                9 Products
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                500+ Facilities
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                50+ Cities
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={product.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mr-4`}
                    >
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                        {product.name}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{product.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{product.description}</p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 text-blue-500 mr-2" />
                        Target Audience
                      </h4>
                      <ul className="space-y-2">
                        {product.targetAudience.map((audience, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                            {audience}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/products/${product.id}`}>
                      <Button
                        className={`bg-gradient-to-r ${product.color} text-white hover:opacity-90 transition-opacity`}
                      >
                        Request Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/products/${product.id}`}>
                      <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={`${product.name} Interface`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Benefits</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
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

      {/* Features Overview */}
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
              Why Choose MyLikita?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our products are built with African healthcare needs in mind
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
                icon: Shield,
                title: "Security First",
                description:
                  "Enterprise-grade security with data encryption, access controls, and compliance with healthcare regulations.",
              },
              {
                icon: Database,
                title: "Scalable Architecture",
                description:
                  "Cloud-native solutions that grow with your institution, from small clinics to large hospital networks.",
              },
              {
                icon: Monitor,
                title: "User-Friendly Design",
                description:
                  "Intuitive interfaces designed for healthcare professionals, reducing training time and improving adoption.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
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
              Ready to Transform Your Healthcare Operations?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Schedule a personalized demo to see how our products can revolutionize your healthcare facility.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-4 text-lg font-semibold">
                Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
