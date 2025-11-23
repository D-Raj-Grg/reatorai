"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowLeft, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useVideos } from "@/hooks/use-videos"
import { useGenerateScript, type GenerateScriptParams } from "@/hooks/use-scripts"
import {
  getAllHookFormats,
  getAllFrameworks,
  getAllTones,
  getAllVocabularyLevels,
} from "@/lib/openai/constants"

export default function NewScriptPage() {
  const router = useRouter()
  const { data: videosData, isLoading: videosLoading } = useVideos({ limit: 100 })
  const generateScript = useGenerateScript()

  // Form state
  const [selectedVideoId, setSelectedVideoId] = useState<string>("")
  const [hookFormat, setHookFormat] = useState<string>("")
  const [framework, setFramework] = useState<string>("")
  const [tone, setTone] = useState<string>("casual")
  const [vocabularyLevel, setVocabularyLevel] = useState<string>("simple")
  const [customTopic, setCustomTopic] = useState<string>("")
  const [targetDuration, setTargetDuration] = useState<string>("90")

  // Get available options
  const hookFormats = getAllHookFormats()
  const frameworks = getAllFrameworks()
  const tones = getAllTones()
  const vocabularyLevels = getAllVocabularyLevels()

  // Filter videos with transcripts
  const videosWithTranscripts = videosData?.videos?.filter(v => v.hasTranscript) || []

  const handleGenerate = async () => {
    // Validation
    if (!selectedVideoId) {
      toast.error("Please select a video")
      return
    }
    if (!hookFormat) {
      toast.error("Please select a hook format")
      return
    }
    if (!framework) {
      toast.error("Please select a storytelling framework")
      return
    }

    const params: GenerateScriptParams = {
      videoId: selectedVideoId,
      hookFormat,
      framework,
      tone,
      vocabularyLevel,
      customTopic: customTopic || undefined,
      targetDuration: parseInt(targetDuration) || undefined,
    }

    try {
      await generateScript.mutateAsync(params)
      // Redirect to scripts library after success
      router.push("/scripts")
    } catch {
      // Error handled by hook
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Generate Script</h1>
          <p className="text-muted-foreground">
            Create AI-powered scripts using proven viral frameworks
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Section (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Video Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select Source Video</CardTitle>
              <CardDescription>
                Choose a video with a transcript to base your script on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedVideoId} onValueChange={setSelectedVideoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a video..." />
                </SelectTrigger>
                <SelectContent>
                  {videosLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : videosWithTranscripts.length === 0 ? (
                    <div className="p-4 text-sm text-center space-y-2">
                      <div className="text-muted-foreground font-medium">No videos with transcripts available</div>
                      <div className="text-xs text-muted-foreground">
                        {videosData?.videos && videosData.videos.length > 0 ? (
                          <>Go to Videos page and click &quot;Fetch Transcript&quot; on any video, or sync your channels to auto-fetch transcripts for outlier videos.</>
                        ) : (
                          <>First, add channels and sync videos from the Channels page.</>
                        )}
                      </div>
                    </div>
                  ) : (
                    videosWithTranscripts.map((video) => (
                      <SelectItem key={video.id} value={video.id}>
                        <div className="flex items-center gap-2">
                          {video.isOutlier && (
                            <Badge variant="secondary" className="text-xs">Outlier</Badge>
                          )}
                          <span className="line-clamp-1">{video.title}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Step 2: Hook Format */}
          <Card>
            <CardHeader>
              <CardTitle>2. Choose Hook Format</CardTitle>
              <CardDescription>
                Select how you want to grab attention in the first 3-5 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={hookFormat} onValueChange={setHookFormat}>
                <div className="space-y-3">
                  {hookFormats.map((format) => (
                    <div key={format.id} className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value={format.id} id={format.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={format.id} className="cursor-pointer">
                          <div className="font-medium">{format.name}</div>
                          <div className="text-sm text-muted-foreground">{format.description}</div>
                          <div className="text-xs text-muted-foreground mt-1 italic">
                            Example: {format.example}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">{format.bestFor}</Badge>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Step 3: Storytelling Framework */}
          <Card>
            <CardHeader>
              <CardTitle>3. Choose Storytelling Framework</CardTitle>
              <CardDescription>
                Select the narrative structure for your script
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={framework} onValueChange={setFramework}>
                <div className="space-y-3">
                  {frameworks.map((fw) => (
                    <div key={fw.id} className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value={fw.id} id={fw.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={fw.id} className="cursor-pointer">
                          <div className="font-medium">{fw.name}</div>
                          <div className="text-sm text-muted-foreground">{fw.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Structure: {fw.structure.join(" → ")}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">{fw.bestFor}</Badge>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Step 4: Writing Style */}
          <Card>
            <CardHeader>
              <CardTitle>4. Customize Writing Style</CardTitle>
              <CardDescription>
                Fine-tune the tone and vocabulary level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tone */}
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Vocabulary Level */}
              <div className="space-y-2">
                <Label>Vocabulary Level</Label>
                <Select value={vocabularyLevel} onValueChange={setVocabularyLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vocabularyLevels.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        <div>
                          <div className="font-medium">{v.name}</div>
                          <div className="text-xs text-muted-foreground">{v.description} - {v.readingLevel}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Topic (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="customTopic">Custom Topic (Optional)</Label>
                <Input
                  id="customTopic"
                  placeholder="e.g., 'How AI is changing education'"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Override the video&apos;s topic with your own angle
                </p>
              </div>

              {/* Target Duration */}
              <div className="space-y-2">
                <Label htmlFor="targetDuration">Target Duration (seconds)</Label>
                <Input
                  id="targetDuration"
                  type="number"
                  min="30"
                  max="180"
                  value={targetDuration}
                  onChange={(e) => setTargetDuration(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 60-120 seconds for short-form video
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleGenerate}
              disabled={generateScript.isPending || !selectedVideoId || !hookFormat || !framework}
            >
              {generateScript.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Script
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Panel (Right 1/3) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">1. Select Video</h4>
                <p className="text-muted-foreground">
                  Choose a viral video to analyze and learn from
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">2. Pick Hook Format</h4>
                <p className="text-muted-foreground">
                  Choose from 9 proven attention-grabbing openings
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">3. Select Framework</h4>
                <p className="text-muted-foreground">
                  Apply a storytelling structure (PAS, AIDA, etc.)
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">4. Customize Style</h4>
                <p className="text-muted-foreground">
                  Adjust tone and vocabulary to match your brand
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">5. Generate!</h4>
                <p className="text-muted-foreground">
                  AI creates a custom script in seconds
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Script Output</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">Your generated script will include:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Attention-grabbing hook</li>
                <li>Structured body content</li>
                <li>Compelling call-to-action</li>
                <li>Visual suggestions</li>
                <li>Pacing notes</li>
                <li>Voiceover guidance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
