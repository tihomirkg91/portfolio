import moment from 'moment';
import type { FC } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { FaCheckCircle, FaCode } from 'react-icons/fa';
import { usePortfolio } from '../hooks/usePortfolio';
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

    const handleToggle = useCallback(() => onToggle(), []);

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
            {descriptionArray.length > 0 && (
              <div className="experience-achievements-container">
                <ul className="experience-achievements" role="list">
                  {descriptionArray.map(achievement => {
                    const achievementText =
                      typeof achievement === 'string'
                        ? achievement
                        : String(achievement);

                    return (
                      <li key={`${exp.id}-${achievementText}`} role="listitem">
                        <FaCheckCircle className="achievement-icon" />
                        <span>{achievementText}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div className="experience-technologies">
                <h4>
                  <FaCode className="technologies-icon" />
                  <span>Technologies Used:</span>
                </h4>
                <div
                  className="tech-tags"
                  role="list"
                  aria-label="Technologies used"
                >
                  {exp.technologies.map(tech => (
                    <span
                      key={`${exp.id}-${tech}`}
                      className="tech-tag"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
);

ExperienceItem.displayName = 'ExperienceItem';

const ExperienceComponent: FC = () => {
  const { experience } = usePortfolio();
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(
    new Set()
  );

  const toggleExpanded = useCallback((id: string | number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);

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
      </div>
    </section>
  );
};

export default ExperienceComponent;
