import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import textData from "@/constants/textData";

export const metadata: Metadata = {
  title: "Skills",
  description:
    textData?.skillsPageData?.subtitle?.technical ??
    "Discover Onkar Yaglewad's technical skills, soft skills, and language proficiencies.",
  openGraph: {
    title: "Skills | Onkar Yaglewad",
    description:
      textData?.skillsPageData?.subtitle?.technical ??
      "Overview of Onkar Yaglewad's technical and soft skills.",
  },
  twitter: {
    title: "Skills | Onkar Yaglewad",
    description:
      textData?.skillsPageData?.subtitle?.technical ??
      "Overview of Onkar Yaglewad's technical and soft skills.",
  },
};

export default function Skills() {
  return (
    <div className="space-y-12">
      <section key="TechnicalSkills">
        <SectionTitle
          title={textData.skillsPageData.title.technical}
          subTitle={textData.skillsPageData.subtitle.technical}
        />
        <div className="space-y-6">
          {textData.skillsPageData.technicalSkills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section key="SoftSkills">
        <SectionTitle
          title={textData.skillsPageData.title.soft}
          subTitle={textData.skillsPageData.subtitle.soft}
        />
        <div className="space-y-6">
          {textData.skillsPageData.softSkills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <span className="text-green-600 dark:text-green-400 font-semibold">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section key="Languages">
        <SectionTitle
          title={textData.skillsPageData.title.languages}
          subTitle={textData.skillsPageData.subtitle.languages}
        />
        <div className="space-y-6">
          {textData.skillsPageData.languages.map((language) => (
            <div key={language.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{language.name}</h3>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{language.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${language.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{language.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 