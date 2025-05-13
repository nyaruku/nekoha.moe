import { Helmet } from 'react-helmet';
import shadify from './javascript/shadify.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// BUTTONS
function Privacy() {

  useEffect(() => {
    // Apply shader attributes to the <body> only on this page
    const body = document.body;
    body.setAttribute('data-shader', '/shader/shader.h');
    body.setAttribute('data-shader-speed', '0.1');
    body.setAttribute('data-shader-quality', '1.0');
    body.style = "overflow-y: scroll;";

    return () => {
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <div className="container py-4 px-3 mx-auto bg-dark" style={{"--bs-bg-opacity": ".8"}}>
        <p>We respect your privacy and are committed to protecting it through our compliance with this privacy policy (“Policy”). This Policy describes the types of information we may collect from you or that you may provide (“Personal Information”) on the <a class="link-secondary" href="https://nekoha.moe" target="_blank" rel="nofollow noreferrer noopener external">nekoha.moe</a> website (“Website” or “Service”) and any of its related products and services (collectively, “Services”), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update it.</p>
        <p>This Policy is a legally binding agreement between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this Policy on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this Policy, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Policy, you must not accept this Policy and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>
        <h2>Automatic collection of information</h2>
        <p>When you open the Website, our servers automatically record information that your browser sends. This data may include information such as your device’s IP address, browser type, and version, operating system type and version, language preferences or the webpage you were visiting before you came to the Website and Services, pages of the Website and Services that you visit, the time spent on those pages, information you search for on the Website, access times and dates, and other statistics.</p>
        <p>Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding the usage and traffic of the Website and Services. This statistical information is not otherwise aggregated in such a way that would identify any particular User of the system.</p>
        <h2>Use and processing of collected information</h2>
        <p>We act as a data controller and a data processor when handling Personal Information, unless we have entered into a data processing agreement with you in which case you would be the data controller and we would be the data processor.</p>
        <p>Our role may also differ depending on the specific situation involving Personal Information. We act in the capacity of a data controller when we ask you to submit your Personal Information that is necessary to ensure your access and use of the Website and Services. In such instances, we are a data controller because we determine the purposes and means of the processing of Personal Information.</p>
        <p>We act in the capacity of a data processor in situations when you submit Personal Information through the Website and Services. We do not own, control, or make decisions about the submitted Personal Information, and such Personal Information is processed only in accordance with your instructions. In such instances, the User providing Personal Information acts as a data controller.</p>
        <p>In order to make the Website and Services available to you, or to meet a legal obligation, we may need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you with the requested products or services. Any of the information we collect from you may be used for the following purposes:</p>
        <ul>
        <li>Enforce terms and conditions and policies</li>
        <li>Protect from abuse and malicious users</li>
        <li>Respond to legal requests and prevent harm</li>
        <li>Run and operate the Website and Services</li>
        </ul>
        <p>Processing your Personal Information depends on how you interact with the Website and Services, where you are located in the world and if one of the following applies: (a) you have given your consent for one or more specific purposes; (b) provision of information is necessary for the performance of this Policy with you and/or for any pre-contractual obligations thereof; (c) processing is necessary for compliance with a legal obligation to which you are subject; (d) processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us; (e) processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.</p>
        <p>Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
        <h2>Disclosure of information</h2>
        <p>Depending on the requested Services or as necessary to complete any transaction or provide any Service you have requested, we may share your non-personally identifiable information with our contracted companies, and service providers (collectively, “Service Providers”) we rely upon to assist in the operation of the Website and Services available to you and whose privacy policies are consistent with ours or who agree to abide by our policies with respect to your information. We will not share any information with unaffiliated third parties.</p>
        <p>Service Providers are not authorized to use or disclose your information except as necessary to perform services on our behalf or comply with legal requirements. Service Providers are given the information they need only in order to perform their designated functions, and we do not authorize them to use or disclose any of the provided information for their own marketing or other purposes.</p>
        <h2>Retention of information</h2>
        <p>We will retain and use your Personal Information for the period necessary to comply with our legal obligations, to enforce our Policy, resolve disputes, and unless a longer retention period is required or permitted by law.</p>
        <p>We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification, and the right to data portability cannot be enforced after the expiration of the retention period.</p>
        <h2>Cookies</h2>
        <p>Our Website and Services use “cookies” to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.</p>
        <p>We may use cookies to collect, store, and track information for security and personalization, and for statistical purposes. Please note that you have the ability to accept or decline cookies. Most web browsers automatically accept cookies by default, but you can modify your browser settings to decline cookies if you prefer.</p>
        <h2>Privacy of children</h2>
        <p>We do not knowingly collect any Personal Information from children under the age of 18. If you are under the age of 18, please do not submit any Personal Information through the Website and Services. If you have reason to believe that a child under the age of 18 has provided Personal Information to us through the Website and Services, please contact us to request that we delete that child’s Personal Information from our Services.</p>
        <p>We encourage parents and legal guardians to monitor their children’s Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through the Website and Services without their permission. We also ask that all parents and legal guardians overseeing the care of children take the necessary precautions to ensure that their children are instructed to never give out Personal Information when online without their permission.</p>
        <h2>Do Not Track signals</h2>
        <p>Some browsers incorporate a Do Not Track feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these purposes, tracking refers to collecting personally identifiable information from users who use or visit a website or online service as they move across different websites over time. How browsers communicate the Do Not Track signal is not yet uniform. As a result, the Website and Services are not yet set up to interpret or respond to Do Not Track signals communicated by your browser. Even so, as described in more detail throughout this Policy, we limit our use and collection of your Personal Information. For a description of Do Not Track protocols for browsers and mobile devices or to learn more about the choices available to you, visit <a class="link-secondary" href="https://www.internetcookies.com" target="_blank">internetcookies.com</a></p>
        <h2>Social media features</h2>
        <p>Our Website and Services may include social media features, such as the Facebook and Twitter buttons, Share This buttons, etc (collectively, “Social Media Features”). These Social Media Features may collect your IP address, what page you are visiting on our Website and Services, and may set a cookie to enable Social Media Features to function properly. Social Media Features are hosted either by their respective providers or directly on our Website and Services. Your interactions with these Social Media Features are governed by the privacy policy of their respective providers.</p>
        <h2 id="links-to-other-resources">Links to other resources</h2>
        <p>The Website and Services contain links to other resources that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other resources or third parties. We encourage you to be aware when you leave the Website and Services and to read the privacy statements of each and every resource that may collect Personal Information.</p>
        <h2>Information security</h2>
        <p>We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in our control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.</p>
        <p>Therefore, while we strive to protect your Personal Information, you acknowledge that (a) there are security and privacy limitations of the Internet which are beyond our control; (b) the security, integrity, and privacy of any and all information and data exchanged between you and the Website and Services cannot be guaranteed; and (c) any such information and data may be viewed or tampered with in transit by a third party, despite best efforts.</p>
        <h2>Data breach</h2>
        <p>In the event we become aware that the security of the Website and Services has been compromised or Users’ Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities.</p>
        <p>In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the User as a result of the breach or if notice is otherwise required by law. When we do, we will post a notice on the Website. In jurisdictions where required, we may also report the breach to relevant authorities in accordance with applicable data protection regulations.</p>
        <h2>Changes and amendments</h2>
        <p>We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
        <p>An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes. However, we will not, without your consent, use your Personal Information in a manner materially different than what was stated at the time your Personal Information was collected.</p>
        <h2>Acceptance of this policy</h2>
        <p>You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services and submitting your information you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services.</p>
        <h2>Contacting us</h2>
        <p>If you have any questions, concerns, or complaints regarding this Policy, the information we hold about you, or if you wish to exercise your rights, we encourage you to contact us using the details below:</p>
        <p><a class="link-secondary" href="mailto:test@nekoha.moe">meow@nekoha.moe</a></p>
        <p>We will attempt to resolve complaints and disputes and make every reasonable effort to honor your wish to exercise your rights as quickly as possible and in any event, within the timescales provided by applicable data protection laws.</p>
        <p>If you believe your concerns have not been adequately addressed, you may escalate the matter to the appropriate data protection authority in your region, in accordance with applicable privacy laws.</p>
        <p>This document was last updated on May 13, 2025</p>
      </div>
    </>
  );
}

export default Privacy;
