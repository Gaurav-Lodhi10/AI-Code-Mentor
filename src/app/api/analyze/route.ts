import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { problemName, code, language = "javascript" } = await request.json();

    // Analyze code using Groq Llama 70B
    const analysis = await analyzeCodeWithGroq(problemName, code, language);

    const mockSubmission = {
      id: "mock-" + Date.now(),
      userId: session.user.email || "unknown",
      problemName,
      code,
      language,
      status: "analyzed",
      createdAt: new Date().toISOString(),
    };

    const mockCodeAnalysis = {
      id: "analysis-" + Date.now(),
      submissionId: mockSubmission.id,
      ...analysis,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      submission: mockSubmission,
      analysis: mockCodeAnalysis,
      recommendations: [
        {
          id: "rec-1",
          userId: session.user.email || "unknown",
          type: "problem",
          title: "Next Challenge",
          description: "Try a similar problem to reinforce concepts",
          priority: "high",
        },
      ],
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}

async function analyzeCodeWithGroq(problemName: string, code: string, language: string) {
  const prompt = `You are a code analysis expert. Analyze this ${language} coding solution for the problem "${problemName}":

Code:
${code}

IMPORTANT: Respond with ONLY a valid JSON object in this exact format:

{
  "strengths": "List 2-3 specific strengths of this solution",
  "improvements": "List 2-3 specific areas for improvement", 
  "recommendations": "Provide 2-3 personalized learning recommendations",
  "timeComplexity": "O(n) or similar notation",
  "spaceComplexity": "O(n) or similar notation",
  "score": 85
}

Analysis criteria:
- Code quality and structure
- Algorithm efficiency and correctness
- Problem-solving approach
- Knowledge gaps and learning opportunities
- Time and space complexity analysis
- Best practices and optimization opportunities

CRITICAL: Do not include any text before or after the JSON. Do not use markdown formatting. Return ONLY the JSON object.`;

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY not found in environment variables");
    }
    
    console.log("Using Groq API key:", apiKey.substring(0, 10) + "...");
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1-distill-llama-70b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API response:", response.status, response.statusText);
      console.error("Error details:", errorText);
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    try {
      // Clean the response text to extract JSON
      let jsonText = analysisText;
      
      // Remove any content before the first {
      const firstBraceIndex = analysisText.indexOf('{');
      if (firstBraceIndex !== -1) {
        jsonText = analysisText.substring(firstBraceIndex);
      }
      
      // Find the last } to get the complete JSON object
      const lastBraceIndex = jsonText.lastIndexOf('}');
      if (lastBraceIndex !== -1) {
        jsonText = jsonText.substring(0, lastBraceIndex + 1);
      }
      
      // Remove markdown code blocks if present
      const jsonMatch = jsonText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
      
      console.log("Cleaned JSON text:", jsonText);
      
      // Try to parse the JSON response
      const parsedAnalysis = JSON.parse(jsonText);
      
      // Handle both string and array formats for strengths, improvements, recommendations
      const strengths = Array.isArray(parsedAnalysis.strengths) 
        ? parsedAnalysis.strengths.join(". ") 
        : parsedAnalysis.strengths || "Code analysis completed successfully";
        
      const improvements = Array.isArray(parsedAnalysis.improvements) 
        ? parsedAnalysis.improvements.join(". ") 
        : parsedAnalysis.improvements || "Review the solution for optimization opportunities";
        
      const recommendations = Array.isArray(parsedAnalysis.recommendations) 
        ? parsedAnalysis.recommendations.join(". ") 
        : parsedAnalysis.recommendations || "Practice similar problems to improve skills";
      
      return {
        strengths,
        improvements,
        recommendations,
        timeComplexity: parsedAnalysis.timeComplexity || "O(n)",
        spaceComplexity: parsedAnalysis.spaceComplexity || "O(n)",
        score: parsedAnalysis.score || 70,
      };
    } catch (parseError) {
      // If JSON parsing fails, extract information from the text
      console.log("Failed to parse JSON, extracting from text:", analysisText);
      console.log("Parse error:", parseError);
      return extractAnalysisFromText(analysisText);
    }
  } catch (error) {
    console.error("Groq API error:", error);
    // Fallback analysis if API fails
    return {
      strengths: "Code analysis completed",
      improvements: "Review the solution for optimization opportunities",
      recommendations: "Practice similar problems to improve skills",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      score: 70,
    };
  }
}

function extractAnalysisFromText(text: string) {
  console.log("Extracting analysis from text:", text.substring(0, 200) + "...");
  
  // Extract analysis components from text if JSON parsing fails
  const analysis = {
    strengths: "Code analysis completed",
    improvements: "Review the solution for optimization opportunities",
    recommendations: "Practice similar problems to improve skills",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    score: 70,
  };

  // Try to extract JSON-like content
  const jsonMatch = text.match(/\{[^}]*"strengths"[^}]*\}/);
  if (jsonMatch) {
    try {
      const partialJson = jsonMatch[0] + '}';
      const parsed = JSON.parse(partialJson);
      if (parsed.strengths) analysis.strengths = parsed.strengths;
      if (parsed.improvements) analysis.improvements = parsed.improvements;
      if (parsed.recommendations) analysis.recommendations = parsed.recommendations;
      if (parsed.timeComplexity) analysis.timeComplexity = parsed.timeComplexity;
      if (parsed.spaceComplexity) analysis.spaceComplexity = parsed.spaceComplexity;
      if (parsed.score) analysis.score = parsed.score;
      return analysis;
    } catch (e) {
      console.log("Failed to parse partial JSON:", e);
    }
  }

  // Try to extract strengths
  if (text.toLowerCase().includes("strength")) {
    const strengthMatch = text.match(/strength[^:]*:\s*([^.\n]+)/i);
    if (strengthMatch) {
      analysis.strengths = strengthMatch[1].trim();
    }
  }

  // Try to extract improvements
  if (text.toLowerCase().includes("improvement")) {
    const improvementMatch = text.match(/improvement[^:]*:\s*([^.\n]+)/i);
    if (improvementMatch) {
      analysis.improvements = improvementMatch[1].trim();
    }
  }

  // Try to extract time complexity
  const timeMatch = text.match(/O\([^)]+\)/);
  if (timeMatch) {
    analysis.timeComplexity = timeMatch[0];
  }

  // Try to extract score
  const scoreMatch = text.match(/(\d+)\s*%/);
  if (scoreMatch) {
    analysis.score = parseInt(scoreMatch[1]);
  }

  return analysis;
} 