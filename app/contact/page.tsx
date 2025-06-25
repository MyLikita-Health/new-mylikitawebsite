"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Calendar, ArrowRight, CheckCircle } from "lucide-react"

export default function ContactPage() {
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@mylikita.com",
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+234 (0) 123 456 7890",
      description: "Speak with our team Monday to Friday, 9AM - 6PM WAT",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Abuja, Nigeria",
      description: "Our headquarters in the heart of Nigeria's capital",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM WAT",
      description: "We're here to help during business hours",
    },
  ]

  const faqs = [
    {
      question: "How long does implementation typically take?",
      answer:
        "Implementation timelines vary based on facility size and complexity, typically ranging from 2-8 weeks for most healthcare facilities.",
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
      question: "Can your systems integrate with existing healthcare equipment?",
      answer:
        "Yes, our solutions are designed for seamless integration with most medical devices and existing healthcare infrastructure.",
    },
    {
      question: "What are your pricing models?",
      answer:
        "We offer flexible pricing models including subscription-based and one-time licensing options tailored to different facility sizes and needs.",
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
              Get in <span className="text-gradient">Touch</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Ready to transform your healthcare facility? Let's discuss how MyLikita can help you achieve your digital
              health goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <Input placeholder="Enter your first name" className="border-gray-300 dark:border-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <Input placeholder="Enter your last name" className="border-gray-300 dark:border-gray-600" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization
                    </label>
                    <Input
                      placeholder="Enter your organization name"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                    <Textarea
                      placeholder="Tell us about your healthcare facility and how we can help..."
                      rows={5}
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We're here to help you transform your healthcare facility with our innovative solutions.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="bg-gray-50 dark:bg-gray-800 border-0 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{info.details}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    Schedule a Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                  >
                    <Users className="mr-3 h-5 w-5" />
                    Request Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900"
                  >
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Live Chat Support
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our healthcare technology solutions
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
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
            <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions? We're here to help.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Transform your healthcare facility today with MyLikita's comprehensive digital health solutions.
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
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
