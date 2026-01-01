import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export const ContactEmailTemplate = ({
  name,
  email,
  phone,
  projectType,
  message,
}: ContactEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>New Inquiry</Heading>
        </Section>
        <Section style={section}>
          <Text style={text}>
            <strong>Full Name:</strong> {name}
          </Text>
          <Text style={text}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={text}>
            <strong>Phone:</strong> {phone}
          </Text>
          <Text style={text}>
            <strong>Project Type:</strong> {projectType}
          </Text>
          <Hr style={hr} />
          <Text style={text}>
            <strong>Message:</strong>
          </Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            This email was sent from the Archcon website contact form.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px',
  textAlign: 'center' as const,
  backgroundColor: '#5d0e1b', // Maroon color from the site
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
};

const section = {
  padding: '0 32px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const messageText = {
  ...text,
  padding: '16px',
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  padding: '0 32px',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
