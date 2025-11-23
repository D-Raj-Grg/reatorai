"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Copy,
  Download,
  Star,
  Trash2,
  RefreshCw,
  FileText,
  Clock,
  Sparkles,
  Video,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScript, useToggleFavorite, useDeleteScript } from "@/hooks/use-scripts";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { ScriptDetailSkeleton } from "@/components/ui/loading-skeletons";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ScriptDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const { data, isLoading, error } = useScript(id);
  const toggleFavorite = useToggleFavorite();
  const deleteScript = useDeleteScript();

  const handleCopyToClipboard = async () => {
    if (!data?.script) return;

    const script = data.script;
    const topicSection = script.topic ? `TOPIC: ${script.topic}\n\n` : '';
    const fullText = `${topicSection}${script.hook_text || ''}\n\n${script.body_text || ''}\n\n${script.cta_text || ''}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopySuccess(true);
      toast.success('Copied to clipboard!');

      // Reset icon after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownloadTxt = () => {
    if (!data?.script) return;

    const script = data.script;
    const topicSection = script.topic ? `TOPIC: ${script.topic}\n\n` : '';
    const fullText = `${topicSection}${script.hook_text || ''}\n\n${script.body_text || ''}\n\n${script.cta_text || ''}\n\n---\n\nGENERATED DETAILS:\n- Hook Format: ${script.hook_format || 'N/A'}\n- Framework: ${script.storytelling_framework || 'N/A'}\n- Estimated Duration: ${script.estimated_duration || 'N/A'} seconds\n- Word Count: ${script.word_count || 'N/A'} words\n- Created: ${script.created_at ? new Date(script.created_at).toLocaleString() : 'N/A'}`;

    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = script.topic ? `script-${script.topic.toLowerCase().replace(/\s+/g, '-')}.txt` : `script-${id}.txt`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Script downloaded as TXT!');
  };

  const handleDownloadMarkdown = () => {
    if (!data?.script) return;

    const script = data.script;

    // Build markdown content
    let markdown = '';

    // Title
    if (script.topic) {
      markdown += `# ${script.topic}\n\n`;
    }

    // Metadata section
    markdown += '## Script Details\n\n';
    markdown += `- **Hook Format:** ${script.hook_format || 'N/A'}\n`;
    markdown += `- **Framework:** ${script.storytelling_framework || 'N/A'}\n`;
    markdown += `- **Estimated Duration:** ${script.estimated_duration || 'N/A'} seconds\n`;
    markdown += `- **Word Count:** ${script.word_count || 'N/A'} words\n`;
    markdown += `- **Created:** ${script.created_at ? new Date(script.created_at).toLocaleString() : 'N/A'}\n\n`;

    // Hook section
    markdown += '## Hook\n\n';
    markdown += `${script.hook_text || 'No hook available'}\n\n`;

    // Body section
    markdown += '## Body\n\n';
    markdown += `${script.body_text || 'No body content available'}\n\n`;

    // CTA section
    markdown += '## Call-to-Action\n\n';
    markdown += `${script.cta_text || 'No call-to-action available'}\n\n`;

    // Visual suggestions (if available)
    if (script.visual_suggestions) {
      markdown += '## Visual Suggestions\n\n';
      markdown += `${script.visual_suggestions}\n\n`;
    }

    // Source video (if available)
    if (sourceVideo) {
      markdown += '## Source Video\n\n';
      markdown += `- **Title:** ${sourceVideo.title || 'Untitled'}\n`;
      if (sourceVideo.channels) {
        markdown += `- **Channel:** ${sourceVideo.channels.channel_name}\n`;
      }
      markdown += `- **Watch:** [View on YouTube](https://youtube.com/watch?v=${sourceVideo.video_id})\n\n`;
    }

    // Footer
    markdown += '---\n\n';
    markdown += '*Generated by ReatorAI*\n';

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = script.topic ? `script-${script.topic.toLowerCase().replace(/\s+/g, '-')}.md` : `script-${id}.md`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Script downloaded as Markdown!');
  };

  const handleDownloadJSON = () => {
    if (!data?.script) return;

    const script = data.script;

    // Build comprehensive JSON structure
    const jsonData = {
      id: script.id,
      topic: script.topic,
      metadata: {
        hookFormat: script.hook_format,
        storytellingFramework: script.storytelling_framework,
        estimatedDuration: script.estimated_duration,
        wordCount: script.word_count,
        tokensUsed: script.tokens_used,
        isFavorite: script.is_favorite,
        createdAt: script.created_at,
        updatedAt: script.updated_at,
      },
      content: {
        hook: script.hook_text,
        body: script.body_text,
        cta: script.cta_text,
        visualSuggestions: script.visual_suggestions,
        fullScript: script.full_script,
      },
      sourceVideo: sourceVideo ? {
        id: sourceVideo.id,
        videoId: sourceVideo.video_id,
        title: sourceVideo.title,
        url: `https://youtube.com/watch?v=${sourceVideo.video_id}`,
        thumbnailUrl: sourceVideo.thumbnail_url,
        viewCount: sourceVideo.view_count,
        publishedAt: sourceVideo.published_at,
        channel: sourceVideo.channels ? {
          name: sourceVideo.channels.channel_name,
          handle: sourceVideo.channels.channel_handle,
        } : null,
      } : null,
      exportedAt: new Date().toISOString(),
      exportedBy: 'ReatorAI',
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = script.topic ? `script-${script.topic.toLowerCase().replace(/\s+/g, '-')}.json` : `script-${id}.json`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Script downloaded as JSON!');
  };

  const handleToggleFavorite = async () => {
    if (!data?.script) return;

    try {
      await toggleFavorite.mutateAsync({
        scriptId: id,
        isFavorite: !data.script.is_favorite
      });
    } catch {
      // Error is handled in the hook
    }
  };

  const handleDelete = async () => {
    try {
      await deleteScript.mutateAsync(id);
      setShowDeleteDialog(false);
      router.push('/scripts');
    } catch {
      // Error is handled in the hook
    }
  };

  const handleRegenerate = () => {
    if (!data?.script?.source_video_id) {
      toast.error('Cannot regenerate: source video not found');
      return;
    }

    // Navigate to script generation page with video pre-selected
    router.push(`/scripts/new?videoId=${data.script.source_video_id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
        <ScriptDetailSkeleton />
      </div>
    );
  }

  if (error || !data || !data.success) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Script not found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              The script you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Button onClick={() => router.push("/scripts")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scripts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const script = data.script;
  const sourceVideo = script.videos as typeof script.videos & {
    id: string;
    video_id: string;
    title: string;
    thumbnail_url?: string;
    view_count?: number;
    published_at?: string;
    channels?: { channel_name: string; channel_handle?: string };
  };

  return (
    <div className="flex flex-col gap-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/scripts")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {script.topic || 'Untitled Script'}
              </h1>
              {script.is_favorite && (
                <Star className="h-6 w-6 fill-yellow-500 text-yellow-500 flex-shrink-0 mt-1" />
              )}
            </div>
            <p className="text-muted-foreground mt-2">
              Created {script.created_at ? formatDistanceToNow(new Date(script.created_at), { addSuffix: true }) : 'recently'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyToClipboard}
              disabled={!script.full_script}
            >
              {copySuccess ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              Copy
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!script.full_script}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownloadTxt}>
                  <FileText className="h-4 w-4 mr-2" />
                  Download as TXT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadMarkdown}>
                  <FileText className="h-4 w-4 mr-2" />
                  Download as Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadJSON}>
                  <FileText className="h-4 w-4 mr-2" />
                  Download as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              disabled={toggleFavorite.isPending}
            >
              <Star className={`h-4 w-4 mr-2 ${script.is_favorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              {script.is_favorite ? 'Unfavorite' : 'Favorite'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={!script.source_video_id}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-3">
        {/* Script Content - 2/3 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Hook Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Hook
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {script.hook_text || 'No hook available'}
              </p>
            </CardContent>
          </Card>

          {/* Body Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Body
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {script.body_text || 'No body content available'}
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Call-to-Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {script.cta_text || 'No call-to-action available'}
              </p>
            </CardContent>
          </Card>

          {/* Visual Suggestions */}
          {script.visual_suggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Visual Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {script.visual_suggestions}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Script Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Script Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Estimated Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base font-semibold">
                    {script.estimated_duration ? `${script.estimated_duration} seconds` : 'N/A'}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Word Count</p>
                <p className="text-base font-semibold">{script.word_count || 'N/A'} words</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Generation Parameters</p>
                <div className="space-y-2">
                  {script.hook_format && (
                    <Badge variant="secondary" className="text-xs">
                      {script.hook_format}
                    </Badge>
                  )}
                  {script.storytelling_framework && (
                    <Badge variant="secondary" className="text-xs ml-1">
                      {script.storytelling_framework}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Source Video */}
          {sourceVideo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Source Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sourceVideo.thumbnail_url && (
                  <img
                    src={sourceVideo.thumbnail_url}
                    alt={sourceVideo.title || 'Video thumbnail'}
                    className="w-full rounded-lg"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                    {sourceVideo.title || 'Untitled Video'}
                  </h4>
                  {sourceVideo.channels && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {sourceVideo.channels.channel_name}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href={`/videos/${sourceVideo.id}`}>
                      View Video Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Script?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your script
              &quot;{script.topic || 'Untitled Script'}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteScript.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
