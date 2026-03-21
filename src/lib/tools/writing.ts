import type { Tool } from "../types";

export const writingTools: Tool[] = [
  { slug: "paraphrase-tool", name: "Paraphrase Tool", description: "Rephrase text while maintaining the original meaning.", category: "writing", icon: "🔄", keywords: ["paraphrase", "rephrase", "reword", "rewrite text"], subcategory: "generation",
    longDescription: "Instantly reword any passage while preserving the original meaning and intent. The paraphrase tool helps writers avoid repetition, improve sentence variety, and produce fresh content without changing the core message. Ideal for students, bloggers, and professionals who need polished, original-sounding prose.",
    faqs: [
      { question: "Does paraphrasing count as plagiarism?", answer: "Paraphrasing without proper attribution can still be considered plagiarism. Always cite your original source when rephrasing someone else's ideas." },
      { question: "Can I use this for academic writing?", answer: "Yes, but use it as a starting point. Review and adjust the output to match your own voice, and always credit the original source." },
      { question: "What types of text work best?", answer: "The tool works well on paragraphs, sentences, and articles. Highly technical or very short text may produce less variation." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste or type the text you want to rephrase into the input field." },
      { name: "Step 2", text: "Click the Paraphrase button to generate a reworded version." },
      { name: "Step 3", text: "Review the output and copy it, or edit it further to match your style." }
    ],
    useCases: [
      "Rewriting academic passages to avoid self-plagiarism",
      "Refreshing blog content or product descriptions",
      "Improving sentence variety in long-form writing",
      "Simplifying complex text for a broader audience"
    ],
    relatedSlugs: ["grammar-checker", "readability-checker", "word-counter"]
  },
  { slug: "grammar-checker", name: "Grammar Checker", description: "Check text for grammar, spelling, and punctuation errors.", category: "writing", icon: "✅", keywords: ["grammar checker", "spell check", "punctuation", "proofreading"], subcategory: "analysis",
    longDescription: "Scan your text for grammar mistakes, spelling errors, and punctuation issues in seconds. The grammar checker highlights problems and suggests corrections so you can produce clean, professional writing every time. Suitable for emails, essays, reports, and any written content.",
    faqs: [
      { question: "Does it check for style issues as well as grammar?", answer: "The tool focuses primarily on grammar, spelling, and punctuation. For style suggestions such as passive voice or wordiness, use the dedicated checkers." },
      { question: "Is my text stored or shared?", answer: "No. All processing is done in your browser and your text is never sent to a server or stored." },
      { question: "Can it handle multiple languages?", answer: "Currently the checker is optimized for English. Support for other languages may vary." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste or type your text into the checker's input area." },
      { name: "Step 2", text: "Run the check to highlight grammar, spelling, and punctuation errors." },
      { name: "Step 3", text: "Review each highlighted error and apply the suggested correction." }
    ],
    useCases: [
      "Proofreading emails before sending to clients or colleagues",
      "Checking essays and academic papers for errors",
      "Polishing blog posts and articles prior to publication",
      "Catching typos in professional reports and proposals"
    ],
    relatedSlugs: ["readability-checker", "paraphrase-tool", "word-counter"]
  },
  { slug: "headline-analyzer", name: "Headline Analyzer", description: "Analyze headlines for emotional impact, power words, and length.", category: "writing", icon: "📰", keywords: ["headline analyzer", "title analyzer", "headline score", "headline checker"], subcategory: "analysis",
    longDescription: "Score your headlines against proven criteria including emotional impact, power word usage, character length, and word balance. A strong headline dramatically increases click-through rates, and this analyzer gives you actionable feedback to write titles that attract readers and perform well in search.",
    faqs: [
      { question: "What makes a headline score high?", answer: "High-scoring headlines combine emotional or power words, an optimal length of 6–10 words, and a clear benefit or curiosity hook for the reader." },
      { question: "How many power words should a headline have?", answer: "Aim for at least one or two power words. Headlines with 20–30% emotional or power words typically see better engagement." },
      { question: "Does headline score affect SEO?", answer: "Indirectly, yes. A compelling headline increases click-through rate, which is a positive signal for search engine rankings." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type or paste your headline into the analyzer input field." },
      { name: "Step 2", text: "Review the score and the breakdown of emotional words, power words, and length." },
      { name: "Step 3", text: "Revise your headline based on the feedback and re-analyze until you're satisfied." }
    ],
    useCases: [
      "Optimizing blog post titles for higher click-through rates",
      "Testing email subject lines before sending campaigns",
      "Improving article headlines for news and media sites",
      "Writing ad copy headlines that drive more conversions"
    ],
    relatedSlugs: ["heading-analyzer", "readability-checker", "keyword-density"]
  },
  { slug: "title-generator", name: "Blog Title Generator", description: "Generate catchy blog post titles from your topic or keywords.", category: "writing", icon: "💡", keywords: ["title generator", "blog title", "headline generator", "content ideas"], subcategory: "generation",
    longDescription: "Enter a topic or keyword and instantly receive a list of engaging, click-worthy blog post titles. The generator uses proven headline formulas — lists, how-tos, questions, and power-word patterns — to spark content ideas and save you time in the brainstorming phase.",
    faqs: [
      { question: "How many titles does the generator produce at once?", answer: "The generator typically produces a batch of 10–20 title variations per query, giving you plenty of options to choose from." },
      { question: "Can I use these titles for YouTube videos or podcasts?", answer: "Absolutely. The formulas work across content formats including videos, podcasts, newsletters, and social posts." },
      { question: "Do the generated titles include keywords?", answer: "Yes, the generator incorporates your input keyword into each title variation to help with SEO relevance." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your blog topic, niche, or target keyword into the input field." },
      { name: "Step 2", text: "Click Generate to receive a batch of title ideas based on proven formulas." },
      { name: "Step 3", text: "Pick the title that best fits your content and audience, then refine it as needed." }
    ],
    useCases: [
      "Brainstorming blog post ideas when facing writer's block",
      "Generating multiple title options for A/B testing",
      "Coming up with YouTube video titles and podcast episode names",
      "Planning editorial calendars with a list of ready-to-use topics"
    ],
    relatedSlugs: ["headline-analyzer", "keyword-density", "slug-generator"]
  },
  { slug: "text-summarizer", name: "Text Summarizer", description: "Summarize long articles and documents into key points.", category: "writing", icon: "📋", keywords: ["text summarizer", "article summary", "summarize text", "tldr"], subcategory: "analysis",
    longDescription: "Condense lengthy articles, reports, and documents into concise summaries that capture the most important ideas. The text summarizer saves reading time and helps you quickly extract key points from research papers, news articles, and business documents without missing critical information.",
    faqs: [
      { question: "How long can the input text be?", answer: "The summarizer handles texts of several thousand words. For very large documents, you may need to summarize section by section." },
      { question: "Is the summary always accurate?", answer: "The tool extracts key sentences and ideas from the original text. Always review the summary to ensure nothing critical was omitted." },
      { question: "Can I adjust the length of the summary?", answer: "Yes, most summarizers let you choose a short, medium, or detailed summary length to match your needs." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste the full article or document text into the input area." },
      { name: "Step 2", text: "Select your preferred summary length or detail level." },
      { name: "Step 3", text: "Click Summarize to generate the condensed version and copy the result." }
    ],
    useCases: [
      "Quickly digesting research papers and academic articles",
      "Summarizing meeting notes and lengthy business reports",
      "Creating TL;DR sections for blog posts and newsletters",
      "Reviewing news articles and long-form content efficiently"
    ],
    relatedSlugs: ["word-counter", "readability-checker", "text-truncator"]
  },
  { slug: "sentence-counter", name: "Sentence Counter", description: "Count sentences and analyze average sentence length for readability.", category: "writing", icon: "📝", keywords: ["sentence counter", "sentence count", "sentence length", "text analysis"], subcategory: "analysis",
    longDescription: "Count the exact number of sentences in any text and calculate the average sentence length to assess writing clarity. Shorter average sentence lengths generally improve readability, and this tool helps you identify when your writing may be too dense or too fragmented for your target audience.",
    faqs: [
      { question: "What is the ideal average sentence length?", answer: "For general audiences, aim for an average of 15–20 words per sentence. Shorter sentences improve clarity; longer ones can convey complexity but may reduce readability." },
      { question: "How does the tool detect sentence boundaries?", answer: "The counter identifies sentences by periods, exclamation marks, and question marks followed by a space or end of text." },
      { question: "Can I use this alongside a readability checker?", answer: "Yes, sentence length is a key factor in readability scores, so using both tools together gives you a complete picture of your writing." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste or type your text into the sentence counter input field." },
      { name: "Step 2", text: "View the total sentence count and average words per sentence." },
      { name: "Step 3", text: "Identify overly long sentences and break them up to improve readability." }
    ],
    useCases: [
      "Assessing the readability of academic essays and research papers",
      "Checking that blog posts have a varied and engaging sentence rhythm",
      "Editing marketing copy to ensure clear, punchy sentences",
      "Reviewing student writing for sentence structure diversity"
    ],
    relatedSlugs: ["word-counter", "readability-checker", "character-counter"]
  },
  { slug: "passive-voice-checker", name: "Passive Voice Checker", description: "Detect and highlight passive voice usage in your writing.", category: "writing", icon: "🔍", keywords: ["passive voice", "active voice", "writing style", "grammar"], subcategory: "analysis",
    longDescription: "Identify every instance of passive voice in your text so you can rewrite sentences to be more direct and engaging. Active voice makes writing clearer, more authoritative, and easier to read. This checker highlights passive constructions and shows you exactly where to make improvements.",
    faqs: [
      { question: "Is passive voice always wrong?", answer: "No. Passive voice is appropriate in scientific writing, when the actor is unknown, or when you want to emphasize the action over the subject. The goal is intentional use, not elimination." },
      { question: "What percentage of passive voice is acceptable?", answer: "Most writing guides suggest keeping passive voice below 10–15% of sentences. Higher rates often make text feel weak or evasive." },
      { question: "How do I convert passive to active voice?", answer: "Identify the actor doing the action and move them to the subject position. For example, 'The report was written by Sarah' becomes 'Sarah wrote the report.'" }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the passive voice checker input area." },
      { name: "Step 2", text: "Review the highlighted passive voice sentences in the results." },
      { name: "Step 3", text: "Rewrite flagged sentences using active voice for clearer, stronger writing." }
    ],
    useCases: [
      "Strengthening business reports and professional emails",
      "Improving academic writing by mixing active and passive intentionally",
      "Editing blog posts and articles for a more direct style",
      "Proofreading marketing copy to make it more persuasive"
    ],
    relatedSlugs: ["grammar-checker", "readability-checker", "word-counter"]
  },
  { slug: "cliche-checker", name: "Cliche Checker", description: "Find overused phrases and cliches in your writing.", category: "writing", icon: "🚫", keywords: ["cliche checker", "overused phrases", "writing quality", "cliche finder"], subcategory: "analysis",
    longDescription: "Scan your writing for tired, overused clichés and stock phrases that weaken your prose. Fresh, original language keeps readers engaged, and this checker flags the most common clichés so you can replace them with more specific and memorable wording that makes your writing stand out.",
    faqs: [
      { question: "What counts as a cliche?", answer: "A cliche is a phrase so commonly used that it has lost its original impact, such as 'think outside the box,' 'at the end of the day,' or 'low-hanging fruit.'" },
      { question: "Are all cliches bad?", answer: "Not always. In casual conversation or genre fiction, some clichés set tone effectively. In professional and creative writing, minimizing them generally produces stronger results." },
      { question: "How many cliches are in the database?", answer: "The checker includes hundreds of the most commonly flagged clichés in English, covering idioms, business jargon, and worn-out metaphors." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the cliche checker input field." },
      { name: "Step 2", text: "Review the list of detected clichés highlighted in your text." },
      { name: "Step 3", text: "Replace each flagged phrase with a more specific, original expression." }
    ],
    useCases: [
      "Polishing creative writing and short stories before submission",
      "Improving the quality of business reports and presentations",
      "Editing blog posts to make them feel more fresh and authentic",
      "Reviewing marketing copy to avoid generic, forgettable language"
    ],
    relatedSlugs: ["grammar-checker", "readability-checker", "word-frequency"]
  },
  { slug: "transition-word-finder", name: "Transition Word Finder", description: "Identify and suggest transition words for better writing flow.", category: "writing", icon: "🔗", keywords: ["transition words", "connecting words", "writing flow", "essay transitions"], subcategory: "analysis",
    longDescription: "Analyze your text to see how well you're using transition words to connect ideas, paragraphs, and arguments. Transition words like 'however,' 'therefore,' and 'in addition' create logical flow and guide readers through your writing. This tool highlights existing transitions and suggests where to add more.",
    faqs: [
      { question: "Why are transition words important?", answer: "Transition words signal relationships between ideas — contrast, addition, causation, sequence — making your writing easier to follow and more persuasive." },
      { question: "Can too many transition words hurt my writing?", answer: "Yes. Overusing transitions can make writing feel mechanical. Aim for natural placement that genuinely connects ideas rather than padding every sentence." },
      { question: "What categories of transition words does the tool cover?", answer: "The tool covers additive, adversative, causal, sequential, and illustrative transitions, among others." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your essay or article text into the transition word finder." },
      { name: "Step 2", text: "Review the highlighted transition words already in your text." },
      { name: "Step 3", text: "Use the suggestions to add or improve transitions where the text feels abrupt." }
    ],
    useCases: [
      "Improving essay flow and logical structure for academic assignments",
      "Making blog posts and articles easier to read from start to finish",
      "Strengthening argument progression in persuasive writing",
      "Teaching students about cohesive writing and paragraph linking"
    ],
    relatedSlugs: ["readability-checker", "grammar-checker", "sentence-counter"]
  },
  { slug: "writing-prompt-generator", name: "Writing Prompt Generator", description: "Generate creative writing prompts for stories, essays, and journals.", category: "writing", icon: "✨", keywords: ["writing prompt", "story prompt", "creative writing", "journal prompt"], subcategory: "generation",
    longDescription: "Instantly generate unique writing prompts for fiction, nonfiction, journaling, poetry, and more. Whether you're facing writer's block or looking for daily journal inspiration, the writing prompt generator delivers fresh, thought-provoking ideas to get your creativity flowing.",
    faqs: [
      { question: "Can I choose a specific genre or prompt type?", answer: "Yes, many prompt generators let you filter by category such as fantasy, romance, thriller, personal journal, or essay prompts." },
      { question: "Are the prompts suitable for all ages?", answer: "The default prompts are appropriate for general audiences. Prompts are designed to inspire creative thinking without explicit or offensive content." },
      { question: "How often are new prompts added?", answer: "The generator uses a large database of prompts so you'll rarely see the same one twice. New prompts are added regularly." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Choose a genre or writing type from the available categories, or leave it set to random." },
      { name: "Step 2", text: "Click Generate to receive a fresh writing prompt." },
      { name: "Step 3", text: "Start writing immediately based on the prompt, spending at least 10–15 minutes on your response." }
    ],
    useCases: [
      "Overcoming writer's block with a new creative direction",
      "Daily journaling with unique, thought-provoking prompts",
      "Classroom writing exercises for students of all levels",
      "NaNoWriMo prep and short story brainstorming"
    ],
    relatedSlugs: ["title-generator", "lorem-ipsum", "flashcard-maker"]
  },
  { slug: "email-template-generator", name: "Email Template Generator", description: "Generate professional email templates for common business scenarios.", category: "writing", icon: "📧", keywords: ["email template", "business email", "email generator", "professional email"], subcategory: "generation",
    longDescription: "Create polished, professional email templates for any business scenario in seconds. From follow-up emails and meeting requests to apology letters and project updates, the generator produces clear, well-structured drafts you can customize and send immediately — saving you time and helping you communicate confidently.",
    faqs: [
      { question: "What types of email templates are available?", answer: "The generator covers business scenarios including follow-ups, introductions, meeting requests, thank-you notes, apologies, project updates, and cold outreach." },
      { question: "Can I customize the generated templates?", answer: "Yes. Every template is fully editable. Replace the placeholder text with your specific details, names, and context before sending." },
      { question: "Are these templates suitable for formal business communication?", answer: "Yes. Templates are written in professional English and are appropriate for corporate and formal business contexts." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Select the type of email scenario you need a template for." },
      { name: "Step 2", text: "Enter any relevant details such as recipient name, subject, or key points to include." },
      { name: "Step 3", text: "Copy the generated template, personalize it, and paste it into your email client." }
    ],
    useCases: [
      "Drafting professional follow-up emails after meetings or interviews",
      "Writing clear meeting request emails that get responses",
      "Creating apology or escalation emails during client issues",
      "Producing cold outreach emails for sales and partnership inquiries"
    ],
    relatedSlugs: ["email-signature-generator", "privacy-policy-generator", "grammar-checker"]
  },
  { slug: "alliteration-finder", name: "Alliteration Finder", description: "Find and highlight alliterative phrases in your text.", category: "writing", icon: "🔤", keywords: ["alliteration", "alliteration finder", "literary device", "writing tool"], subcategory: "analysis",
    longDescription: "Detect alliterative phrases in your writing — sequences of words that share the same starting sound. Alliteration adds rhythm, memorability, and flair to poetry, headlines, brand names, and creative prose. This tool highlights every instance so you can use the device intentionally and effectively.",
    faqs: [
      { question: "What exactly is alliteration?", answer: "Alliteration is the repetition of the same consonant sound at the beginning of closely connected words, such as 'Peter Piper picked a peck of pickled peppers.'" },
      { question: "Is alliteration useful in professional writing?", answer: "Yes. In headlines, brand slogans, and marketing copy, alliteration increases memorability and makes text more engaging." },
      { question: "Does the finder detect assonance as well?", answer: "The tool focuses on initial consonant alliteration. Assonance (repeated vowel sounds within words) is a related but separate literary device." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your poem, article, or other text into the alliteration finder." },
      { name: "Step 2", text: "Review the highlighted alliterative sequences detected in your writing." },
      { name: "Step 3", text: "Use the results to amplify intentional alliteration or remove unintended repetition." }
    ],
    useCases: [
      "Checking poetry for deliberate alliterative patterns",
      "Crafting memorable brand names, slogans, and taglines",
      "Writing attention-grabbing headlines and titles",
      "Analyzing classic literature for alliterative literary devices"
    ],
    relatedSlugs: ["word-frequency", "readability-checker", "cliche-checker"]
  },
  { slug: "rhyme-finder", name: "Rhyme Finder", description: "Find rhyming words for poetry, songwriting, and creative projects.", category: "writing", icon: "🎵", keywords: ["rhyme finder", "rhyming words", "rhyme dictionary", "poetry tool"], subcategory: "generation",
    longDescription: "Search for perfect rhymes, near rhymes, and similar-sounding words to elevate your poetry, lyrics, and creative writing. The rhyme finder provides instant results organized by syllable count and rhyme type, making it easier than ever to find the right word that fits your rhythm and meaning.",
    faqs: [
      { question: "What is the difference between a perfect rhyme and a near rhyme?", answer: "A perfect rhyme shares the same vowel and ending sounds (cat/bat). A near rhyme, or slant rhyme, shares some but not all sounds (cat/cut), giving writers more flexibility." },
      { question: "Can I use this for song lyrics?", answer: "Absolutely. Songwriters frequently use rhyme finders to explore options and avoid settling for weak or forced rhymes." },
      { question: "How many rhyming words does it return?", answer: "The tool returns all matching rhymes from its dictionary, often dozens or hundreds of options depending on the word." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type the word you need to rhyme in the search field." },
      { name: "Step 2", text: "Browse the list of perfect rhymes and near rhymes returned by the tool." },
      { name: "Step 3", text: "Select the word that fits your meter and meaning best." }
    ],
    useCases: [
      "Writing rhyming poetry and finding the perfect closing word",
      "Crafting song lyrics with natural, flowing rhyme schemes",
      "Creating children's books, nursery rhymes, and educational content",
      "Developing catchy slogans and jingles for advertising"
    ],
    relatedSlugs: ["writing-prompt-generator", "word-frequency", "alliteration-finder"]
  },
  { slug: "text-case-counter", name: "Text Statistics Analyzer", description: "Analyze text with detailed stats: syllables, Flesch score, grade level, and more.", category: "writing", icon: "📊", keywords: ["text stats", "syllable counter", "flesch score", "text analysis"], subcategory: "analysis",
    longDescription: "Get a comprehensive breakdown of your text's statistics including syllable count, Flesch-Kincaid readability score, estimated grade level, word and sentence count, and average word length. These metrics help writers calibrate their content for the right audience and ensure the appropriate level of complexity.",
    faqs: [
      { question: "What is the Flesch readability score?", answer: "The Flesch Reading Ease score rates text on a 0–100 scale. Higher scores mean easier reading. A score of 60–70 is suitable for most general audiences." },
      { question: "What grade level should I target?", answer: "For general web content and blog posts, aim for a 6th–8th grade reading level. Academic writing and technical content may target a higher level." },
      { question: "How is the syllable count calculated?", answer: "The analyzer counts syllables using standard English pronunciation rules. Results may vary slightly for unusual or foreign-origin words." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the statistics analyzer input area." },
      { name: "Step 2", text: "Review the full breakdown including syllable count, Flesch score, and grade level." },
      { name: "Step 3", text: "Use the results to simplify or enrich your text to match your target audience." }
    ],
    useCases: [
      "Calibrating blog content to the right reading level for your audience",
      "Checking academic writing meets expected complexity standards",
      "Analyzing readability of marketing copy and landing page text",
      "Evaluating student essays against grade-appropriate benchmarks"
    ],
    relatedSlugs: ["readability-checker", "word-counter", "sentence-counter"]
  },
  { slug: "outline-generator", name: "Outline Generator", description: "Generate structured outlines for essays, articles, and presentations.", category: "writing", icon: "📝", keywords: ["outline generator", "essay outline", "article structure", "content outline"], subcategory: "generation",
    longDescription: "Generate a clear, logically structured outline for any essay, article, or presentation topic in seconds. A well-organized outline is the foundation of effective writing, and this tool helps you plan your content hierarchy — main points, subpoints, and supporting details — before you start writing.",
    faqs: [
      { question: "What types of outlines can the generator create?", answer: "The generator can create outlines for essays (argumentative, expository, narrative), blog articles, research papers, and presentation slide decks." },
      { question: "Can I edit the generated outline?", answer: "Yes. The outline is a starting framework. You should add, remove, and rearrange sections to match your specific content and argument." },
      { question: "Does it work for long-form content like ebooks?", answer: "Yes, though for very long content you may want to generate outlines chapter by chapter for more focused and detailed results." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your topic, thesis statement, or main idea into the generator." },
      { name: "Step 2", text: "Select the type of content you're writing (essay, article, presentation, etc.)." },
      { name: "Step 3", text: "Review and customize the generated outline before beginning to write." }
    ],
    useCases: [
      "Planning academic essays and research papers before writing",
      "Structuring blog posts and long-form articles for clear logical flow",
      "Organizing presentation slide decks with a coherent narrative",
      "Breaking down complex topics into manageable writing sections"
    ],
    relatedSlugs: ["title-generator", "headline-analyzer", "writing-prompt-generator"]
  },
  { slug: "word-spinner", name: "Word Spinner", description: "Spin/rewrite individual words with synonyms for variety.", category: "writing", icon: "🔀", keywords: ["word spinner", "synonym finder", "word replacer", "paraphrase words"], subcategory: "generation",
    longDescription: "Replace any word with a rich selection of synonyms to add variety and flair to your writing. The word spinner helps you escape repetitive vocabulary by offering context-aware alternatives for any term you highlight, making your prose more engaging and your vocabulary more diverse. Perfect for writers looking to polish drafts without losing their original meaning.",
    faqs: [
      { question: "How do I use the word spinner?", answer: "Type or paste your text, then click on any word to see a list of synonym alternatives. Click a synonym to swap it in immediately." },
      { question: "Does it preserve the original meaning?", answer: "The tool offers synonyms that are semantically close to the original word. Always review replacements in context to ensure the meaning and tone are preserved." },
      { question: "Can I use it on entire sentences?", answer: "The word spinner works best on individual words. For full sentence paraphrasing, try the Paraphrase Tool instead." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Type or paste your text into the input area." },
      { name: "Step 2", text: "Click on any word you want to replace to see synonym suggestions." },
      { name: "Step 3", text: "Select your preferred synonym and it replaces the original word instantly." }
    ],
    useCases: [
      "Avoiding repetitive word use across a long essay or article",
      "Expanding vocabulary while writing academic or professional content",
      "Freshening up product descriptions and marketing copy",
      "Helping ESL writers find more natural-sounding word alternatives"
    ],
    relatedSlugs: ["paraphrase-tool", "readability-improver", "grammar-checker"]
  },
  { slug: "adverb-checker", name: "Adverb Checker", description: "Find and reduce adverb usage for stronger, more precise writing.", category: "writing", icon: "🔎", keywords: ["adverb checker", "adverb finder", "writing style", "strong verbs"], subcategory: "analysis",
    longDescription: "Detect every adverb in your text and get suggestions for replacing weak adverb-verb combinations with stronger, more precise verbs. Overusing adverbs is a hallmark of weak writing — this tool highlights them so you can revise sentences to be more direct, vivid, and impactful.",
    faqs: [
      { question: "Why should I reduce adverbs?", answer: "Adverbs often prop up weak verbs. Replacing 'ran quickly' with 'sprinted' is more vivid and concise. Reducing adverbs generally produces stronger, more professional prose." },
      { question: "Should I eliminate all adverbs?", answer: "No — some adverbs serve a genuine purpose. The goal is intentional use. This tool helps you identify ones that could be replaced for stronger effect." },
      { question: "What counts as an adverb?", answer: "The checker primarily targets -ly adverbs (quickly, very, really, extremely) and common intensifiers that often weaken sentences." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the adverb checker input field." },
      { name: "Step 2", text: "Review the highlighted adverbs and their frequency in your text." },
      { name: "Step 3", text: "Replace flagged adverb-verb pairs with stronger, more precise verb alternatives." }
    ],
    useCases: [
      "Editing fiction and creative writing to use stronger, more vivid verbs",
      "Strengthening business reports and professional documents",
      "Improving journalistic writing by cutting weak intensifiers",
      "Teaching students about strong verb usage in writing classes"
    ],
    relatedSlugs: ["passive-voice-checker", "readability-improver", "grammar-checker"]
  },
  { slug: "readability-improver", name: "Readability Improver", description: "Suggest simpler alternatives for complex words to improve clarity.", category: "writing", icon: "📖", keywords: ["readability", "simplify text", "plain language", "complex words"], subcategory: "analysis",
    longDescription: "Identify overly complex or obscure words in your text and receive plain-language alternatives that communicate the same idea more clearly. Good writing is accessible writing — this tool helps you replace jargon and unnecessarily complicated vocabulary with simpler equivalents that any reader can understand.",
    faqs: [
      { question: "What reading level does the tool target?", answer: "By default, suggestions aim for a 6th–8th grade reading level, suitable for most general audiences. You can adjust the target level for more technical or simplified output." },
      { question: "Does it simplify technical jargon?", answer: "The tool focuses on common complex vocabulary. Highly specialized technical terms may not have suitable simpler equivalents and will be left unchanged." },
      { question: "Will it change the meaning of my text?", answer: "Suggested alternatives are chosen to preserve meaning. Always review each suggestion in context before accepting it to ensure accuracy." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the readability improver input field." },
      { name: "Step 2", text: "Review highlighted complex words and the simpler alternatives suggested for each." },
      { name: "Step 3", text: "Accept or reject each suggestion to produce a clearer, more accessible version of your text." }
    ],
    useCases: [
      "Simplifying academic or legal writing for a general audience",
      "Making government communications and public notices more accessible",
      "Improving user documentation and help articles for non-technical readers",
      "Editing marketing copy to ensure it speaks clearly to all customers"
    ],
    relatedSlugs: ["readability-checker", "paraphrase-tool", "word-counter"]
  },
  { slug: "abstract-generator", name: "Abstract Generator", description: "Generate concise abstracts for academic papers and research articles.", category: "writing", icon: "🎓", keywords: ["abstract generator", "paper abstract", "research abstract", "academic writing"], subcategory: "generation",
    longDescription: "Generate a structured, concise abstract for any academic paper, thesis, or research article by entering the key components of your work. A well-written abstract is the most-read part of any paper and determines whether readers continue to the full text — this tool helps you craft one that clearly summarizes your purpose, methods, results, and conclusions.",
    faqs: [
      { question: "What should an abstract include?", answer: "A standard abstract covers: background/motivation, research question or objective, methodology, key results, and conclusions or implications. The generator prompts you for each section." },
      { question: "How long should an abstract be?", answer: "Most journal abstracts are 150–300 words. Conference abstracts may be shorter at 100–150 words. Check your target publication's guidelines." },
      { question: "Can I use this for a conference abstract submission?", answer: "Yes. The generator creates a clear, structured abstract suitable for conference submissions, journal articles, and thesis documents." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your research topic, objectives, methods, and key findings into the respective fields." },
      { name: "Step 2", text: "Click Generate to produce a structured abstract draft." },
      { name: "Step 3", text: "Edit the output to match your specific results and your target journal's word limit." }
    ],
    useCases: [
      "Writing abstracts for journal article submissions in academic fields",
      "Preparing conference paper abstracts for submission deadlines",
      "Summarizing thesis or dissertation research for the abstract section",
      "Creating structured summaries for grant proposals and research funding applications"
    ],
    relatedSlugs: ["text-summarizer", "outline-generator", "grammar-checker"]
  },
  { slug: "thesis-statement-generator", name: "Thesis Statement Generator", description: "Generate clear, arguable thesis statements for essays and papers.", category: "writing", icon: "📌", keywords: ["thesis statement", "thesis generator", "essay thesis", "argument statement"], subcategory: "generation",
    longDescription: "Generate a focused, arguable thesis statement for any essay topic in seconds. A strong thesis statement is the foundation of a well-structured essay — it presents your main argument clearly and tells readers exactly what your paper will prove. This tool guides you through the key elements and produces a polished thesis ready for your introduction.",
    faqs: [
      { question: "What makes a good thesis statement?", answer: "A good thesis is specific, arguable, and roadmaps the main points of your essay. It takes a clear position on a topic rather than stating an obvious fact." },
      { question: "Can this work for argumentative and expository essays?", answer: "Yes. The generator adapts to different essay types — argumentative, expository, compare-and-contrast, and analytical — to produce an appropriate thesis structure." },
      { question: "Should I use the generated thesis exactly as-is?", answer: "Use it as a strong starting draft and refine it to match your specific evidence, tone, and assignment requirements." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your essay topic and the main argument or position you want to take." },
      { name: "Step 2", text: "Select the essay type (argumentative, expository, analytical, etc.)." },
      { name: "Step 3", text: "Review the generated thesis statement and adjust it to fit your specific essay." }
    ],
    useCases: [
      "Writing thesis statements for high school and college argumentative essays",
      "Drafting position statements for research papers and literature reviews",
      "Helping students understand what a thesis should accomplish before writing",
      "Quickly generating multiple thesis options to choose the strongest one"
    ],
    relatedSlugs: ["outline-generator", "writing-prompt-generator", "grammar-checker"]
  },
  { slug: "conclusion-generator", name: "Conclusion Generator", description: "Generate strong conclusion paragraphs for essays and articles.", category: "writing", icon: "🏁", keywords: ["conclusion generator", "essay conclusion", "writing conclusion", "closing paragraph"], subcategory: "generation",
    longDescription: "Generate a well-structured conclusion paragraph that effectively wraps up your essay or article by restating your thesis, summarizing key points, and leaving readers with a memorable closing thought. A strong conclusion reinforces your argument and gives readers a satisfying sense of completion — this tool helps you write one that hits all the right notes.",
    faqs: [
      { question: "What should a conclusion paragraph include?", answer: "A strong conclusion restates the thesis in fresh language, briefly summarizes the main supporting points, and ends with a broader implication, call to action, or thought-provoking closing statement." },
      { question: "Should I just repeat the introduction in the conclusion?", answer: "No. Your conclusion should echo the thesis but use different phrasing, and the closing thought should go beyond what was already said, offering a broader perspective or call to action." },
      { question: "How long should a conclusion be?", answer: "For most essays, the conclusion should be 5–8 sentences — enough to wrap up the argument without introducing new information." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your thesis statement and the main points from your essay body." },
      { name: "Step 2", text: "Click Generate to produce a conclusion draft that ties your essay together." },
      { name: "Step 3", text: "Revise the generated conclusion to match your own voice and the specifics of your argument." }
    ],
    useCases: [
      "Wrapping up academic essays with a polished conclusion paragraph",
      "Closing blog posts and articles with a memorable final thought",
      "Writing conclusions for reports and business documents",
      "Helping students who struggle to end their essays effectively"
    ],
    relatedSlugs: ["outline-generator", "thesis-statement-generator", "writing-prompt-generator"]
  },
  { slug: "hook-generator", name: "Hook Generator", description: "Generate compelling opening hooks for essays, blogs, and speeches.", category: "writing", icon: "🎣", keywords: ["hook generator", "essay hook", "opening hook", "writing opener"], subcategory: "generation",
    longDescription: "Generate attention-grabbing opening hooks for essays, blog posts, speeches, and stories. A powerful hook is what separates a piece that immediately engages readers from one they abandon after the first sentence. This tool provides hooks using proven techniques: surprising statistics, provocative questions, vivid anecdotes, bold statements, and more.",
    faqs: [
      { question: "What types of hooks does the generator produce?", answer: "The generator creates hooks using six techniques: startling statistic, rhetorical question, vivid scene or anecdote, bold declarative statement, relevant quotation, and paradox or contradiction." },
      { question: "Can I use this for a persuasive essay or speech?", answer: "Yes. Hook types can be tailored to your content format — a speech may benefit from an anecdote or question, while an academic essay might use a statistic or quote." },
      { question: "How do I integrate the hook into my introduction?", answer: "Place your hook as the very first sentence. Follow it with 1–2 context-building sentences before transitioning into your thesis statement." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter your essay topic and select a preferred hook style or leave it on random." },
      { name: "Step 2", text: "Click Generate to see several hook options based on your topic." },
      { name: "Step 3", text: "Choose the hook that best suits your tone and writing style, then integrate it into your introduction." }
    ],
    useCases: [
      "Opening academic essays with an engaging first sentence that draws readers in",
      "Starting blog posts with a hook that reduces bounce rates",
      "Beginning speeches and presentations with a memorable opening",
      "Writing compelling introductions for newsletters and email campaigns"
    ],
    relatedSlugs: ["thesis-statement-generator", "outline-generator", "title-generator"]
  },
  { slug: "metaphor-generator", name: "Metaphor Generator", description: "Generate creative metaphors to add depth and color to your writing.", category: "writing", icon: "🌈", keywords: ["metaphor generator", "creative metaphors", "figurative language", "writing imagery"], subcategory: "generation",
    longDescription: "Generate vivid, creative metaphors to enrich your writing with figurative language. Metaphors create powerful connections between ideas, making abstract concepts tangible and memorable. Whether you're writing poetry, a speech, a novel, or an essay, this tool sparks metaphorical thinking and gives you fresh images to work with.",
    faqs: [
      { question: "What is the difference between a metaphor and a simile?", answer: "A metaphor states that something is something else directly (e.g., 'Life is a journey'), while a simile makes the comparison using 'like' or 'as' (e.g., 'Life is like a journey'). This tool generates both." },
      { question: "Can I use the generated metaphors in published work?", answer: "Yes. The generated metaphors are offered as creative inspiration. You're encouraged to adapt and build on them to make them authentically your own." },
      { question: "Are the metaphors suitable for academic writing?", answer: "Metaphors can be used in academic writing when appropriate, particularly in introductions and conclusions. Avoid using them in highly formal scientific writing where precision is paramount." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the concept, emotion, or idea you want to express metaphorically." },
      { name: "Step 2", text: "Select a domain or mood (nature, technology, sport, etc.) for the metaphor or leave on random." },
      { name: "Step 3", text: "Browse the generated metaphors and adapt the one that resonates most with your writing." }
    ],
    useCases: [
      "Enriching poetry and creative fiction with vivid figurative language",
      "Making speeches and presentations more memorable and relatable",
      "Adding color to blog posts and articles to engage readers emotionally",
      "Teaching students about figurative language and creative expression"
    ],
    relatedSlugs: ["writing-prompt-generator", "rhyme-finder", "alliteration-finder"]
  },
  { slug: "tone-analyzer", name: "Tone Analyzer", description: "Analyze the tone of your writing — formal, casual, positive, negative.", category: "writing", icon: "🎭", keywords: ["tone analyzer", "writing tone", "sentiment analysis", "text tone"], subcategory: "analysis",
    longDescription: "Analyze the emotional tone and formality level of any text to ensure your writing strikes the right note for your audience. The tone analyzer detects whether your content is formal or casual, positive or negative, confident or uncertain, and more — giving you actionable feedback to align your writing voice with your intent.",
    faqs: [
      { question: "What tones does the analyzer detect?", answer: "The analyzer evaluates formality level, sentiment (positive/neutral/negative), confidence level, and emotional tone markers such as enthusiastic, serious, empathetic, or urgent." },
      { question: "Why does writing tone matter?", answer: "Tone affects how readers perceive your message and your credibility. A casual tone in a formal report undermines authority; an overly formal tone in a friendly email can feel cold and off-putting." },
      { question: "Can this help me match the tone of an existing piece?", answer: "Yes. Analyze a reference piece first to identify its tone profile, then compare it against your own writing to calibrate the voice accordingly." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Paste your text into the tone analyzer input field." },
      { name: "Step 2", text: "Review the tone breakdown showing formality level, sentiment, and key tone markers." },
      { name: "Step 3", text: "Revise your text based on the analysis to better match your intended tone and audience." }
    ],
    useCases: [
      "Checking that business emails strike a professional yet approachable tone",
      "Verifying that academic writing maintains formal, objective language throughout",
      "Ensuring marketing copy communicates enthusiasm and positivity",
      "Reviewing customer communications to confirm a consistent brand voice"
    ],
    relatedSlugs: ["grammar-checker", "readability-checker", "passive-voice-checker"]
  },
  { slug: "cover-letter-helper", name: "Cover Letter Helper", description: "Generate professional cover letter templates with customizable sections.", category: "writing", icon: "📄", keywords: ["cover letter", "job application", "resume letter", "application letter"], subcategory: "generation",
    longDescription: "Create a compelling, professional cover letter for any job application using customizable templates. The cover letter helper guides you through key sections — opening hook, relevant experience, alignment with the role, and a strong call to action — so you can put together a polished letter that impresses hiring managers.",
    faqs: [
      { question: "How long should a cover letter be?", answer: "A cover letter should typically be three to four paragraphs, fitting on a single page. Concise, targeted letters tend to be more effective than lengthy ones." },
      { question: "Should I customize every cover letter?", answer: "Yes. Tailoring each letter to the specific role and company significantly increases your chances. Use the template as a base, then personalize the details." },
      { question: "What information do I need to get started?", answer: "Have the job title, company name, your key relevant skills, and one or two specific accomplishments ready to fill in the template." }
    ],
    howToSteps: [
      { name: "Step 1", text: "Enter the job title, company name, and your top relevant skills or achievements." },
      { name: "Step 2", text: "Choose from the available template styles (formal, modern, entry-level, etc.)." },
      { name: "Step 3", text: "Copy the generated cover letter, personalize each section, and save it for your application." }
    ],
    useCases: [
      "Applying for jobs and needing a professional cover letter quickly",
      "Entry-level applicants unsure how to structure their first cover letter",
      "Career changers adapting their experience to a new industry",
      "Crafting tailored cover letters for multiple job applications efficiently"
    ],
    relatedSlugs: ["email-template-generator", "grammar-checker", "readability-checker"]
  },
];
