import type { FC } from 'react';
import { memo, useMemo, useState, useCallback } from 'react';
import moment from 'moment';
import { FaCode, FaCheckCircle } from 'react-icons/fa';
import { usePortfolio } from '../hooks/usePortfolio';
import { calculateTotalExperience } from '../utils/dateUtils';
import type { Experience } from '../types';
import './Experience.css';

interface ExperienceItemProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperienceItem: FC<ExperienceItemProps> = memo(
  ({ experience: exp, isExpanded, onToggle }) => {
    const formatDate = useMemo(() => {
      return (dateString: string) => {
        return moment(dateString).format('MMM YYYY');
      };
    }, []);

    const currentDateISO = useMemo(() => {
      return moment().format('YYYY-MM-DD');
    }, []);

    const handleToggle = useCallback(() => {
      onToggle();
    }, [onToggle]);

    const descriptionArray = useMemo(() => {
      const descriptions = Array.isArray(exp?.description)
        ? exp.description
        : [exp?.description].filter(Boolean);
      return descriptions.filter(
        (desc): desc is string => typeof desc === 'string'
      );
    }, [exp?.description]);

    return (
      <article className="experience-item" aria-expanded={isExpanded}>
        <div className="experience-timeline">
          <div className="timeline-dot" aria-hidden="true"></div>
        </div>

        <div className="experience-content">
          <div className="experience-header">
            <h3 className="experience-position">{exp.position}</h3>
            <div className="experience-company">{exp.company}</div>
            <div className="experience-duration">
              <time dateTime={exp.startDate}>{formatDate(exp.startDate)}</time>
              {' - '}
              <time dateTime={exp.endDate || currentDateISO}>
                {exp.endDate ? formatDate(exp.endDate) : 'Present'}
              </time>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className="experience-toggle"
            aria-expanded={isExpanded}
            aria-controls={`experience-details-${exp.id}`}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <span
              className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          <div
            id={`experience-details-${exp.id}`}
            className={`experience-details ${isExpanded ? 'expanded' : 'collapsed'}`}
            aria-hidden={!isExpanded}
          >
            <ul className="experience-achievements" role="list">
              {descriptionArray.map((achievement, index) => {
                // Ensure we're only rendering strings
                const achievementText =
                  typeof achievement === 'string'
                    ? achievement
                    : String(achievement);

                return (
                  <li
                    key={`${exp.id}-achievement-${index}-${achievementText.slice(0, 20)}`}
                    role="listitem"
                  >
                    <FaCheckCircle className="achievement-icon" />
                    {achievementText}
                  </li>
                );
              })}
            </ul>

            <div className="experience-technologies">
              <h4>
                <FaCode className="technologies-icon" />
                Technologies Used:
              </h4>
              <div
                className="tech-tags"
                role="list"
                aria-label="Technologies used"
              >
                {exp.technologies.map((tech, index) => (
                  <span
                    key={`${exp.id}-tech-${tech}-${index}`}
                    className="tech-tag"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
);

ExperienceItem.displayName = 'ExperienceItem';

const ExperienceComponent: FC = memo(() => {
  const { experience } = usePortfolio();
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(
    new Set()
  );

  const totalYearsExperience = useMemo(() => {
    return calculateTotalExperience(experience);
  }, [experience]);

  const toggleExpanded = useCallback((id: string | number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedItems(new Set(experience.map(exp => exp.id)));
  }, [experience]);

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  const allExpanded = expandedItems.size === experience.length;
  const noneExpanded = expandedItems.size === 0;

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>

          <div className="experience-controls">
            <button
              onClick={expandAll}
              disabled={allExpanded}
              className="btn btn-outline"
              aria-label="Expand all experience items"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              disabled={noneExpanded}
              className="btn btn-outline"
              aria-label="Collapse all experience items"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div
          className="experience-timeline-container"
          role="list"
          aria-label="Work experience timeline"
        >
          {experience.map(exp => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              isExpanded={expandedItems.has(exp.id)}
              onToggle={() => toggleExpanded(exp.id)}
            />
          ))}
        </div>

        <div className="experience-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-number">{totalYearsExperience}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">18+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">22+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ExperienceComponent.displayName = 'ExperienceComponent';

export default ExperienceComponent;
