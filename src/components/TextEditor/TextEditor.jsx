import React, { useState } from 'react';
import { BtnUnderline, Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, BtnStrikeThrough, BtnNumberedList, BtnBulletList, Separator, BtnLink, BtnClearFormatting, HtmlButton } from 'react-simple-wysiwyg';
import { Button } from '../ui/button';
import { Brain } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { chatSession } from '../../../service/AiModel';
import { useContext } from 'react';
import { toast } from 'sonner';

const PROMPT = `For the job title "{positionTitle}", provide 3 sets of resume bullet points based on the following experience levels:
- Beginner (Fresher)
- Intermediate (Mid-level)
- Advanced (Experienced)

The output should be in the following format:
{
  "position_title": "{positionTitle}",
  "beginner_bullets": [
    "Bullet 1",
    "Bullet 2",
    "Bullet 3",
    "Bullet 4",
    "Bullet 5",
    "Bullet 6",
    "Bullet 7"
  ],
  "intermediate_bullets": [
    "Bullet 1",
    "Bullet 2",
    "Bullet 3",
    "Bullet 4",
    "Bullet 5",
    "Bullet 6",
    "Bullet 7"
  ],
  "advanced_bullets": [
    "Bullet 1",
    "Bullet 2",
    "Bullet 3",
    "Bullet 4",
    "Bullet 5",
    "Bullet 6",
    "Bullet 7"
  ]
}
Please ensure that the bullets for each experience level are relevant and specific to the position title. Always return the result in the exact format above.`;

function TextEditor({ onTextEditorChange, index }) {
  const [value, setValue] = useState('');
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo.experience[index].title) {
      toast('Please Add Position Title');
      return;
    }

    console.log(resumeInfo.experience[index].title);

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    const result = await chatSession.sendMessage(prompt);

    // Parse the HTML string (if necessary)
    const parser = new DOMParser();
    const doc = parser.parseFromString(result.response.text(), 'text/html');
    const textContent = doc.body.textContent.trim();
    console.log(textContent);

    // Parse the JSON response
    const parsedData = JSON.parse(textContent);

    // Extract the bullets for each experience level
    const beginnerBullets = parsedData['beginner_bullets'];
    const intermediateBullets = parsedData['intermediate_bullets'];
    const advancedBullets = parsedData['advanced_bullets'];

    // Combine them with newline separation for better display in textarea
    const beginnerText = beginnerBullets.join('\n');
    const intermediateText = intermediateBullets.join('\n');
    const advancedText = advancedBullets.join('\n');

    // Set the value for display based on user's experience level choice
    setValue(`Beginner Experience:\n\n${beginnerText}\n\nIntermediate Experience:\n\n${intermediateText}\n\nAdvanced Experience:\n\n${advancedText}`);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary"
          size="sm"
          onClick={GenerateSummeryFromAI}
        >
          <Brain className="h-4 w-4" />
          Generate From AI
        </Button>
      </div>

      {/* Textarea for displaying the generated summary */}
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value); // Update local state on change
          onTextEditorChange(e); // Notify parent component of the change
        }}
        rows={6} // Adjust based on your preference
        className="w-full border p-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
      />

    </div>
  );
}

export default TextEditor;
