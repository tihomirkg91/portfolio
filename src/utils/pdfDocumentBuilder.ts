import type {
  Content,
  ContentCanvas,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import type { PortfolioData } from '../types';
import {
  calculateDuration,
  calculateTotalExperience,
} from '../utils/dateUtils';
import { isValidBase64Image } from '../utils/imageConverter';

export const pdfStyles = {
  name: {
    fontSize: 26,
    bold: true,
    color: '#1e40af',
    margin: [0, 0, 0, 8] as [number, number, number, number],
  },
  title: {
    fontSize: 16,
    bold: true,
    color: '#374151',
    margin: [0, 0, 0, 10] as [number, number, number, number],
  },
  bio: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#111827',
    margin: [0, 0, 0, 6] as [number, number, number, number],
  },
  contact: {
    fontSize: 11,
    color: '#374151',
    bold: true,
    margin: [0, 2, 0, 2] as [number, number, number, number],
  },
  sectionHeader: {
    fontSize: 16,
    bold: true,
    color: '#1e40af',
    margin: [0, 16, 0, 10] as [number, number, number, number],
    decoration: 'underline' as const,
    decorationStyle: 'solid' as const,
  },
  skillList: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
    bold: true,
    margin: [0, 0, 0, 4] as [number, number, number, number],
  },
  jobTitle: {
    fontSize: 15,
    bold: true,
    color: '#111827',
    margin: [0, 0, 0, 2] as [number, number, number, number],
  },
  company: {
    fontSize: 14,
    bold: true,
    color: '#1e40af',
    margin: [0, 0, 0, 2] as [number, number, number, number],
  },
  duration: {
    fontSize: 11,
    bold: true,
    color: '#374151',
  },
  location: {
    fontSize: 10,
    color: '#6b7280',
  },
  description: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#111827',
  },
  technologies: {
    fontSize: 10,
    color: '#6b7280',
    italics: true,
  },
  projectTitle: {
    fontSize: 14,
    bold: true,
    color: '#111827',
    margin: [0, 0, 0, 2] as [number, number, number, number],
  },
  projectDescription: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#374151',
  },
  footerHeader: {
    fontSize: 12,
    bold: true,
    color: '#1e40af',
    margin: [0, 0, 0, 4] as [number, number, number, number],
  },
  footerDetails: {
    fontSize: 10,
    color: '#374151',
    margin: [0, 1, 0, 1] as [number, number, number, number],
  },
};

export const defaultPdfStyle = {
  fontSize: 12,
  color: '#111827',
};

export const createHeaderSection = (
  portfolioData: PortfolioData,
  base64Img: string
): Content => {
  const { personalInfo } = portfolioData;

  return {
    columns: [
      {
        width: base64Img && isValidBase64Image(base64Img) ? 90 : 0,
        stack:
          base64Img && isValidBase64Image(base64Img)
            ? [
                {
                  image: base64Img,
                  width: 80,
                  margin: [0, 0, 0, 0] as [number, number, number, number],
                  alignment: 'left' as const,
                },
              ]
            : [],
      },
      {
        width: '*',
        margin: [12, -6, 0, 0] as [number, number, number, number],
        stack: [
          {
            text: personalInfo.fullName,
            style: 'name',
          },
          {
            text: personalInfo.title,
            style: 'title',
          },
          {
            text: personalInfo.bio,
            style: 'bio',
          },
        ],
      },
    ],
    margin: [0, 0, 0, 18] as [number, number, number, number],
    columnGap: 12,
  };
};

export const createDividerLine = (
  width: number = 515,
  lineWidth: number = 2,
  color: string = '#1e40af',
  margin: [number, number, number, number] = [0, 0, 0, 16]
): ContentCanvas => {
  return {
    canvas: [
      {
        type: 'line' as const,
        x1: 0,
        y1: 0,
        x2: width,
        y2: 0,
        lineWidth,
        lineColor: color,
      },
    ],
    margin,
  };
};

export const createSkillsSection = (
  portfolioData: PortfolioData
): Content[] => {
  const { personalInfo } = portfolioData;

  const skills =
    personalInfo.currentTechStack ||
    (() => {
      const { experience } = portfolioData;
      const allTechnologies = experience.flatMap(exp => exp.technologies);
      return [...new Set(allTechnologies)];
    })();

  return [
    {
      text: 'TECHNICAL SKILLS',
      style: 'sectionHeader',
    },
    {
      text: skills.join(' • '),
      style: 'skillList',
      margin: [0, 6, 0, 16] as [number, number, number, number],
    },
  ];
};

export const createExperienceSection = (
  portfolioData: PortfolioData
): Content[] => {
  const { experience } = portfolioData;

  const formattedExperience = experience.map(exp => ({
    ...exp,
    duration: exp.duration,
  }));

  return [
    {
      text: 'PROFESSIONAL EXPERIENCE',
      style: 'sectionHeader',
    },
    ...formattedExperience.map((exp, index) => ({
      stack: [
        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  text: exp.position,
                  style: 'jobTitle',
                },
                {
                  text: exp.company,
                  style: 'company',
                },
              ],
            },
            {
              width: 'auto',
              stack: [
                {
                  text: `${exp.startDate} - ${exp.endDate && exp.endDate.trim() ? exp.endDate : 'Present'}`,
                  style: 'duration',
                  alignment: 'right' as const,
                },
                {
                  text: calculateDuration(exp.startDate, exp.endDate),
                  style: 'location',
                  alignment: 'right' as const,
                },
                {
                  text: exp.location || '',
                  style: 'location',
                  alignment: 'right' as const,
                },
              ],
            },
          ],
        },
        {
          ul: Array.isArray(exp.description)
            ? exp.description
            : [exp.description],
          style: 'description',
          margin: [0, 6, 0, 6] as [number, number, number, number],
        },
        {
          text: `Technologies: ${exp.technologies.join(', ')}`,
          style: 'technologies',
          margin: [
            0,
            0,
            0,
            index < formattedExperience.length - 1 ? 14 : 6,
          ] as [number, number, number, number],
        },
      ],
    })),
  ];
};

export const createFooterSection = (
  portfolioData: PortfolioData
): Content[] => {
  const { contactInfo, experience } = portfolioData;
  const totalYearsExperience = calculateTotalExperience(experience);

  return [
    createDividerLine(515, 1, '#1e40af', [0, 16, 0, 12]),
    {
      columns: [
        {
          width: '*',
          stack: [
            {
              text: 'PERSONAL DETAILS',
              style: 'footerHeader',
            },
            {
              text: `Years of Experience: ${totalYearsExperience}+`,
              style: 'footerDetails',
            },
            ...(contactInfo.timezone
              ? [
                  {
                    text: `Timezone: ${contactInfo.timezone}`,
                    style: 'footerDetails',
                  },
                ]
              : []),
          ],
        },
        {
          width: '*',
          stack: [
            {
              text: 'CONTACT INFORMATION',
              style: 'footerHeader',
            },
            {
              text: contactInfo.email,
              style: 'footerDetails',
            },
            ...(contactInfo.phone
              ? [
                  {
                    text: contactInfo.phone,
                    style: 'footerDetails',
                  },
                ]
              : []),
            ...(contactInfo.location
              ? [
                  {
                    text: contactInfo.location,
                    style: 'footerDetails',
                  },
                ]
              : []),
          ],
        },
        {
          width: '*',
          stack: [
            {
              text: 'PROFESSIONAL LINKS',
              style: 'footerHeader',
            },
            ...(contactInfo.linkedin
              ? [
                  {
                    text: 'LinkedIn Profile',
                    style: 'footerDetails',
                    link: contactInfo.linkedin,
                    color: '#1e40af',
                    decoration: 'underline' as const,
                  },
                ]
              : []),
            ...(contactInfo.github
              ? [
                  {
                    text: 'GitHub Profile',
                    style: 'footerDetails',
                    link: contactInfo.github,
                    color: '#1e40af',
                    decoration: 'underline' as const,
                  },
                ]
              : []),
            ...(contactInfo.portfolio
              ? [
                  {
                    text: 'Portfolio Website',
                    style: 'footerDetails',
                    link: contactInfo.portfolio,
                    color: '#1e40af',
                    decoration: 'underline' as const,
                  },
                ]
              : []),
          ],
        },
      ],
      margin: [0, 0, 0, 0] as [number, number, number, number],
    },
  ];
};

export const createProjectsSection = (
  portfolioData: PortfolioData
): Content[] => {
  const { projects } = portfolioData;

  if (!projects || projects.length === 0) {
    return [];
  }

  // Show only the most important projects (limit to 3-4 for PDF space)
  // Exclude "Falling Planet Rhythm Game" from PDF
  const filteredProjects = projects.filter(
    project => project.title !== 'Falling Planet Rhythm Game'
  );
  const topProjects = filteredProjects.slice(0, 4);

  return [
    ...topProjects.map((project, index) => ({
      stack: [
        {
          text: project.title,
          style: 'projectTitle',
        },
        {
          text: project.description,
          style: 'projectDescription',
          margin: [0, 2, 0, 4] as [number, number, number, number],
        },
        {
          text: `Technologies: ${project.technologies.join(', ')}`,
          style: 'technologies',
          margin: [0, 0, 0, index < topProjects.length - 1 ? 12 : 8] as [
            number,
            number,
            number,
            number,
          ],
        },
      ],
    })),
  ];
};

export const createPdfDocumentDefinition = (
  portfolioData: PortfolioData,
  base64Img: string
): TDocumentDefinitions => {
  return {
    pageSize: 'A4',
    pageMargins: [45, 45, 45, 45],
    content: [
      createHeaderSection(portfolioData, base64Img),
      createDividerLine(),
      ...createSkillsSection(portfolioData),
      ...createProjectsSection(portfolioData),
      ...createExperienceSection(portfolioData),
      ...createFooterSection(portfolioData),
    ],
    styles: pdfStyles,
    defaultStyle: defaultPdfStyle,
  };
};
