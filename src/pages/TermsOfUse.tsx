import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface Subsection {
  title: string;
  content: string;
}

interface Section {
  title: string;
  content?: string;
  subsections?: Subsection[];
}

const defaultSections: Section[] = [
  {
    title: "Introduction",
    content: `Welcome to the GGL LINE PVT LTD website (hereinafter referred to as the "Website"). Please review these terms of use carefully before engaging with the Website. Your access and utilization of the Website are governed by these terms of use (hereinafter referred to as the "Terms of Use"). By accessing or using the Website, you agree to be legally bound by these Terms of Use, representing both yourself and the entity you are authorized to act on behalf of (hereinafter referred to as "you" or "your"). If you do not accept all the Terms of Use, refrain from accessing or utilizing the Website.`
  },
  {
    title: "User Eligibility",
    content: "GGL (India) provides the Website exclusively to entities and individuals who have reached the legal age of majority and have the legal capacity to enter into binding agreements under the applicable law in India. If you do not meet these criteria, you are not authorized to use the Website."
  },
  {
    title: "Scope of Terms of Use",
    content: `These Terms of Use govern your use of the Website and all related applications, software, and services, collectively referred to as "Services," except where a separate agreement applies. Specific terms or agreements, known as "Service Agreements," may apply to certain Services or items provided through the Website. These Service Agreements will either accompany the relevant Services or be accessible via an associated hyperlink.`
  },
  {
    title: "Modifications",
    content: "GGL (India) reserves the right to modify these Terms of Use at any time. Your continued use of the Website after any changes signifies your acceptance of such modifications. GGL (India) may alter, supplement, delete, or update any aspect of the Website without notice and may adjust or introduce fees for products and services at its sole discretion. General practices and restrictions regarding other GGL (India) products and services may also be established or modified at any time, based on GGL (India)'s sole discretion."
  },
  {
    title: "GGL (India) Privacy Notice",
    content: "By providing any individual's personal information to GGL (India), you affirm that you have obtained all necessary consents for the processing of such personal information as required by the Services."
  },
  {
    title: "License and Ownership",
    content: `All intellectual property rights ("Intellectual Property") related to the Website and its contents (the "Content") are the exclusive property of GGL (India), its affiliates, or third parties, and are protected by intellectual property laws in India and globally. Various elements of the Website are also protected by trade name, trade secret, unfair competition, and other laws, prohibiting any copying or imitation. All custom graphics, icons, and other items on the Website, referred to as trademarks, service marks, or trade names ("Marks"), are the property of GGL (India), its affiliates, or entities granting GGL (India) the right to use these Marks. Unauthorized use or interference with these Marks is strictly prohibited without express written consent from GGL (India). Unless expressly authorized by these Terms of Use, you may not copy, reproduce, modify, lease, loan, sell, create derivative works from, upload, transmit, or distribute GGL (India)'s Intellectual Property without prior written permission from GGL (India) or the appropriate third party.\n\nGGL (India) grants you a limited, personal, non-transferable, non-sublicensable, and revocable license to access and use the Website, Content, and Services ("GGL (India) Systems") as presented by GGL (India) and only as expressly permitted. Apart from this limited license, GGL (India) does not transfer any interest in the GGL (India) Systems, information or data available via the GGL (India) Systems (the "Information"), Content, Services, Website, or any other GGL (India) property by allowing access to the Website. Except where required by law or as expressly provided herein, none of the Content or Information may be reverse-engineered, modified, reproduced, republished, translated, retransmitted, resold, or redistributed without prior written consent from GGL (India). Unauthorized actions such as making, selling, offering for sale, modifying, reproducing, displaying, publicly performing, importing, distributing, retransmitting, or otherwise using the Content are strictly prohibited unless expressly permitted by GGL (India).`
  },
  {
    title: "Restrictions on Website Use",
    content: "In addition to the limitations outlined in these Terms of Use, you agree to the following:\n\n• You must not conceal the origin of information transmitted through the Website.\n• You shall refrain from placing false or misleading information on the Website.\n• Usage or access of any service, information, application, or software available via the Website is restricted to methods expressly permitted by GGL (India).\n• Uploading information to the Website containing viruses, Trojan horses, worms, time bombs, or other computer programming routines intended to damage, interfere with, intercept, or expropriate any system, the Website, or Information, or that infringes on the Intellectual Property rights of others, is strictly prohibited.\n• Specific sections of the Website are exclusive to GGL (India) customers.\n• Using or accessing the Website, GGL (India) Systems, or Services in a manner that, in GGL (India)'s judgment, adversely affects performance or function, or interferes with authorized parties' access to the GGL (India) Systems, Services, or the Website, is not allowed.\n• Framing or employing framing techniques to enclose any portion or aspect of the Content or Information without the express written consent of GGL (India) is prohibited."
  },
  {
    title: "Outbound Links",
    content: `The Website may contain links to third-party websites and resources ("Linked Sites"). These links are provided for your convenience and do not signify GGL (India)'s endorsement of their content. GGL (India) does not guarantee the accuracy, reliability, performance, or quality of any content, software, service, or application found on Linked Sites. GGL (India) is not responsible for the availability of Linked Sites or their content and activities. Access to Linked Sites is at your own risk and is governed by the terms, conditions, and privacy policies of those sites.`
  },
  {
    title: "Inbound Links",
    content: "Linking to any page of the Website other than the homepage through a plain text link is strictly prohibited without a separate linkage agreement with GGL (India). Websites or other entities linking to the homepage or any of its pages are prohibited from:\n\n• Duplicating Content.\n• Using a frame or border around the Content.\n• Implying endorsement by GGL (India) or its affiliates.\n• Misrepresenting any facts about the relationship with GGL (India) or its affiliates.\n• Providing false information about GGL (India) products or services.\n• Using any logo or mark of GGL (India) or its affiliates without express written permission from GGL (India)."
  },
  {
    title: "Termination",
    content: "GGL (India) reserves the right to terminate or suspend your use of the Website, GGL (India) Systems, Information, Services, and Content at its sole discretion, without prior notice or reason. Even if access remains available to others, GGL (India) may suspend or terminate your access at any time. Upon termination or suspension, you must:\n\n• Immediately cease using the Website.\n• Destroy any copies of the Content you have made.\n\nContinuing to access the Website, GGL (India) Systems, Information, or Services after termination, suspension, or discontinuation will be considered trespassing.\n\nGGL (India) is not liable to you or any third party for terminating or suspending your access to the Website, GGL (India) Systems, Information, and/or Services."
  },
  {
    title: "Disclaimer of Warranties",
    content: `GGL (India) makes no guarantees regarding the results you may achieve by using the Website, GGL (India) Systems, Services, Information, or Content. You use these elements at your own risk, and they are provided "as is." To the fullest extent permitted by law, GGL (India), along with its licensors and suppliers, disclaims all warranties, whether express, implied, statutory, or otherwise. This includes, but is not limited to, warranties of merchantability, non-infringement, and fitness for a particular purpose. GGL (India) and its affiliates, licensors, and suppliers do not guarantee the accuracy, completeness, security, or timeliness of the Content, Information, or Services provided on the Website or GGL (India) Systems. No information obtained from the Website creates any warranty that is not expressly stated in these Terms of Use.`
  },
  {
    title: "Limitation of Liability",
    content: "To the extent permitted by law, GGL (India), its affiliates, licensors, suppliers, or any third parties mentioned on the Website are not liable for any incidental, direct, indirect, exemplary, punitive, and/or consequential damages, lost profits, or damages resulting from lost data or business interruption caused by the use or inability to use the Website, GGL (India) Systems, Information, Services, or Content. This limitation applies regardless of the legal theory on which the claim is based, whether warranty, contract, tort, delict, or any other, and even if GGL (India) has been advised of the possibility of such damages. To the extent allowed by law, the remedies provided to you in these Terms of Use are exclusive and limited to those expressly stated herein."
  },
  {
    title: "Compliance with Laws, Including Export Control",
    content: "You agree to use the GGL (India) Website in full compliance with all applicable laws, regulations, and rules. Your actions should not, as determined solely by GGL (India), harm GGL (India)'s goodwill or reputation. Additionally, you must not engage in any activities that could cause GGL (India) to violate any relevant laws, rules, or regulations applicable to GGL (India).\n\nGGL (India) operates from India and manages the export of products and information. You agree to comply with all applicable restrictions and refrain from exporting or re-exporting any Content (including software or Services) to countries or individuals prohibited under India or other relevant export control laws or regulations. By accessing and downloading any Content (including software or Services) or Information, you confirm that you are not located in a country where such export is prohibited and are not a person or entity to whom such export is restricted. You are solely responsible for complying with the laws of your local jurisdiction and any other applicable laws concerning the import, export, or re-export of the Content (including software or Services)."
  },
  {
    title: "Governing Law and Jurisdiction",
    content: "To the maximum extent permitted by law, these Terms of Use are governed by the internal laws of India, and the courts in India shall have sole and exclusive jurisdiction over any disputes arising from or related to these Terms of Use."
  },
  {
    title: "General",
    content: "You may not transfer these Terms of Use or any of your rights, interests, or obligations under these Terms of Use. If any provision of these Terms of Use is found invalid by a court of competent jurisdiction, the invalidity of that provision shall not affect the validity of the remaining provisions, which shall remain in full force and effect. No waiver of any of these Terms of Use shall be considered a continuing waiver of that term or condition or any other term or condition. You may retain a written copy of these Terms of Use by printing them for your records, waiving any other requirement for these Terms of Use to be evidenced by a written document.\n\nWe strive to respond to all inquiries promptly and provide you with the assistance you need. Thank you for choosing GGL LINE PVT LTD."
  }
];

const TermsOfUsePage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/content/terms-of-use')
      .then(res => {
        if (!res.ok) throw new Error('Content not found');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setSections(data);
        } else {
          setSections(defaultSections);
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error('Error fetching terms of use:', err);
        setSections(defaultSections);
        setIsLoaded(true);
      });
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use Agreement for the Website</h1>

        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mt-6 mb-2">{section.title}</h2>
            {section.content && section.content.split('\n\n').map((para, pIndex) => (
              <p key={pIndex} className="whitespace-pre-line mb-2">{para}</p>
            ))}
            {section.subsections && (
              <div className="space-y-4 mt-4">
                {section.subsections.map((sub, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-lg font-medium mb-1">{sub.title}</h3>
                    <p className="whitespace-pre-line">{sub.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
