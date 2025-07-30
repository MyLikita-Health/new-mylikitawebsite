"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Building2, Award, Users, Globe, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function PartnersPage() {
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

  const partners = [
    {
      name: "PHIMA",
      fullName: "Private Healthcare Information Management Association",
      type: "Industry Association",
      description:
        "Strategic partnership for advancing private healthcare digitization across Nigeria and West Africa.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Technology Integration Partner",
      benefits: [
        "Joint healthcare digitization initiatives",
        "Best practices development",
        "Industry standards compliance",
        "Training and certification programs",
      ],
      impact: "Reached 200+ private healthcare facilities",
    },
    {
      name: "OUMC",
      fullName: "Obafemi Awolowo University Medical Centre",
      type: "Academic Medical Center",
      description:
        "Collaboration in medical education technology and healthcare innovation research.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Research & Development Partner",
      benefits: [
        "Medical education technology development",
        "Healthcare innovation research",
        "Student training programs",
        "Clinical workflow optimization",
      ],
      impact: "Enhanced medical education for 5,000+ students",
    },
    {
      name: "Federal Ministry of Health",
      fullName: "Federal Ministry of Health, Nigeria",
      type: "Government Agency",
      description:
        "Supporting national healthcare digitization initiatives and public health data management.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Strategic Government Partner",
      benefits: [
        "National health data standardization",
        "Public health monitoring systems",
        "Healthcare policy implementation",
        "Population health analytics",
      ],
      impact: "Supporting healthcare for 200M+ citizens",
    },
    {
      name: "WHO Africa",
      fullName: "World Health Organization - Africa Region",
      type: "International Organization",
      description:
        "Collaborative efforts in strengthening health systems through digital transformation.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Technical Collaboration Partner",
      benefits: [
        "Health systems strengthening",
        "Digital health standards",
        "Capacity building programs",
        "Regional health initiatives",
      ],
      impact: "Contributing to continental health goals",
    },
    {
      name: "ECOWAS Health",
      fullName: "Economic Community of West African States - Health",
      type: "Regional Organization",
      description:
        "Regional healthcare integration and cross-border health data interoperability.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Regional Integration Partner",
      benefits: [
        "Cross-border health data sharing",
        "Regional health standards",
        "Healthcare workforce mobility",
        "Emergency response coordination",
      ],
      impact: "Serving 15 West African countries",
    },
    {
      name: "African Development Bank",
      fullName: "African Development Bank Group",
      type: "Development Finance",
      description:
        "Financial partnership supporting healthcare infrastructure development across Africa.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Development Finance Partner",
      benefits: [
        "Healthcare infrastructure financing",
        "Technology adoption support",
        "Capacity building funding",
        "Sustainable development goals",
      ],
      impact: "Enabling healthcare access for millions",
    },
  ];

  const partnershipTypes = [
    {
      title: "Technology Partners",
      description: "Leading technology companies that enhance our platform capabilities",
      icon: Building2,
      count: "15+",
      examples: ["Cloud Infrastructure", "AI/ML Platforms", "Security Solutions"],
    },
    {
      title: "Implementation Partners",
      description: "Certified consultants and system integrators across Africa",
      icon: Users,
      count: "25+",
      examples: ["System Integration", "Training Services", "Support Services"],
    },
    {
      title: "Healthcare Networks",
      description: "Hospital groups and healthcare networks using our solutions",
      icon: Globe,
      count: "50+",
      examples: ["Hospital Chains", "Clinic Networks", "Medical Groups"],
    },
    {
      title: "Academic Institutions",
      description: "Universities and research institutions driving innovation",
      icon: Award,
      count: "10+",
      examples: ["Medical Schools", "Research Centers", "Training Institutes"],
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
              Our <span className="text-gradient">Partners</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Collaborating with leading organizations to transform healthcare across Africa through strategic
              partnerships and shared innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
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
              Partnership Ecosystem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Building a comprehensive network of partners to deliver exceptional healthcare solutions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {partnershipTypes.map((type, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{type.count}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{type.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{type.description}</p>
                    <div className="space-y-1">
                      {type.examples.map((example, idx) => (
                        <div key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                          {example}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Partners */}
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
              Strategic Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key partnerships driving healthcare transformation across Africa
            </p>
          </motion.div>

          <div className="space-y-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} Logo`}
                        width={60}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                        {partner.name}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{partner.fullName}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm mt-2">
                        {partner.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{partner.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Partnership Benefits
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {partner.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Partnership Type</span>
                      <p className="font-medium text-gray-900 dark:text-white">{partner.partnership}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-0 shadow-2xl">
                    <CardContent className="p-8 text-center">
                      <div className="w-24 h-24 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} Logo`}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Partnership Impact</h4>
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{partner.impact}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
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
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our ecosystem and help transform healthcare across Africa
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
                title: "Market Leadership",
                description:
                  "Partner with the leading healthcare technology company in Africa with proven track record.",
                icon: Award,
              },
              {
                title: "Comprehensive Solutions",
                description: "Access to complete suite of healthcare technology solutions for diverse market needs.",
                icon: Building2,
              },
              {
                title: "Shared Success",
                description:
                  "Mutual growth through collaborative partnerships and shared expertise in healthcare innovation.",
                icon: Users,
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
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
              Become a Partner
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Join our growing network of partners and help us transform healthcare across Africa.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-4 text-lg font-semibold">
                Partnership Inquiry
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600"
              >
                Download Partnership Guide
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
