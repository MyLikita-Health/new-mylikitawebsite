"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Award, Users, Target, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Issa Mustapha",
      title: "Chief Executive Officer",
      bio: "Visionary leader with over 15 years of experience in healthcare technology and digital transformation across Africa.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Healthcare Strategy",
      linkedin: "#",
    },
    {
      name: "Muhammad Fahad Ado",
      title: "Chief Technology Officer",
      bio: "Technology expert specializing in scalable healthcare solutions and system architecture for emerging markets.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Software Architecture",
      linkedin: "#",
    },
    {
      name: "Nasir Abdurrahman",
      title: "Chief Operating Officer",
      bio: "Operations specialist focused on healthcare delivery optimization and strategic partnerships across the continent.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Operations Management",
      linkedin: "#",
    },
    {
      name: "Dr. Aisha Bello",
      title: "Chief Medical Officer",
      bio: "Experienced physician and healthcare administrator driving clinical excellence and medical innovation initiatives.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Clinical Operations",
      linkedin: "#",
    },
    {
      name: "Ibrahim Suleiman",
      title: "Chief Financial Officer",
      bio: "Financial strategist with expertise in healthcare economics and sustainable business model development.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Financial Strategy",
      linkedin: "#",
    },
    {
      name: "Fatima Al-Hassan",
      title: "VP of Product Development",
      bio: "Product innovation leader focused on user-centered design and cutting-edge healthcare technology solutions.",
      image: "/placeholder.svg?height=300&width=300",
      expertise: "Product Innovation",
      linkedin: "#",
    },
  ]

  const timeline = [
    {
      year: "2018",
      event: "MyLikita founded with a vision to digitize African healthcare",
      description: "Started with a small team of 5 passionate healthcare technology enthusiasts",
      milestone: "Company Founded",
    },
    {
      year: "2019",
      event: "Launched MyLikita HMS, serving first 50 healthcare facilities",
      description: "Successfully deployed our flagship Hospital Management System across Nigeria",
      milestone: "Product Launch",
    },
    {
      year: "2020",
      event: "Expanded to Laboratory Information Systems (LIS)",
      description: "Introduced comprehensive lab management solutions during the pandemic",
      milestone: "Product Expansion",
    },
    {
      year: "2021",
      event: "Introduced Radiology Information System (RIS) with DICOM support",
      description: "Advanced medical imaging capabilities with international standards compliance",
      milestone: "Technology Innovation",
    },
    {
      year: "2022",
      event: "Launched MediLinka telemedicine platform during pandemic",
      description: "Enabled remote healthcare delivery across underserved communities",
      milestone: "Digital Health",
    },
    {
      year: "2023",
      event: "Reached 500+ healthcare facilities across 50+ cities",
      description: "Achieved significant scale with AI-powered healthcare solutions",
      milestone: "Scale Achievement",
    },
    {
      year: "2024",
      event: "Expanded to HR and payroll solutions for medical institutions",
      description: "Comprehensive workforce management for healthcare organizations",
      milestone: "Platform Expansion",
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
              About <span className="text-gradient">MyLikita</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We are pioneering the digital transformation of healthcare in Africa, one institution at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To be the leading healthcare technology company in Africa, empowering every healthcare institution with
                innovative digital solutions that improve patient outcomes and operational efficiency.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To revolutionize healthcare delivery across Africa by providing comprehensive, user-friendly, and
                affordable technology solutions that bridge the gap between traditional healthcare practices and modern
                digital innovation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at MyLikita
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We strive for excellence in every solution we deliver, ensuring the highest quality standards.",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "We work closely with healthcare professionals to understand and address their unique challenges.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We continuously innovate to stay ahead of healthcare technology trends and needs.",
              },
              {
                icon: Target,
                title: "Impact",
                description:
                  "We measure our success by the positive impact we create in healthcare delivery across Africa.",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced leaders driving healthcare innovation across Africa
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {member.expertise}
                            </span>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.title}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-20 w-16 h-16 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to transform African healthcare
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full hidden lg:block"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            index % 3 === 0
                              ? "bg-blue-100 dark:bg-blue-900"
                              : index % 3 === 1
                                ? "bg-purple-100 dark:bg-purple-900"
                                : "bg-indigo-100 dark:bg-indigo-900"
                          }`}
                        >
                          <span
                            className={`text-lg font-bold ${
                              index % 3 === 0
                                ? "text-blue-600 dark:text-blue-400"
                                : index % 3 === 1
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-indigo-600 dark:text-indigo-400"
                            }`}
                          >
                            {item.year}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              index % 3 === 0
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                : index % 3 === 1
                                  ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                                  : "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                            }`}
                          >
                            {item.milestone}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.event}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Central Timeline Node */}
                <div
                  className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10 group-hover:scale-125 transition-transform duration-300"
                  style={{
                    background:
                      index % 3 === 0
                        ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                        : index % 3 === 1
                          ? "linear-gradient(135deg, #8B5CF6, #7C3AED)"
                          : "linear-gradient(135deg, #6366F1, #4F46E5)",
                  }}
                ></div>

                {/* Year Badge for Mobile */}
                <div className="lg:hidden absolute -left-2 top-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                      index % 3 === 0
                        ? "bg-gradient-to-br from-blue-500 to-blue-600"
                        : index % 3 === 1
                          ? "bg-gradient-to-br from-purple-500 to-purple-600"
                          : "bg-gradient-to-br from-indigo-500 to-indigo-600"
                    }`}
                  >
                    <span className="text-white font-bold text-sm">{item.year}</span>
                  </div>
                </div>

                {/* Mobile Timeline Line */}
                <div className="lg:hidden absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { number: "7", label: "Years of Innovation", icon: "🚀" },
              { number: "500+", label: "Healthcare Facilities", icon: "🏥" },
              { number: "9", label: "Product Solutions", icon: "💡" },
              { number: "50+", label: "Cities Reached", icon: "🌍" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">{stat.label}</div>
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
              Join Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Be part of the healthcare transformation in Africa. Let's work together to improve patient outcomes and
              operational efficiency.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-4 text-lg font-semibold">
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Careers
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
