import UserTaggingInput from "@/components/InputTagsField/UserTaggingInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPostService } from "@/services/postService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
// --- Badge Component ---
type BadgeProps = {
  text: string;
  onRemove: () => void;
};

const Badge = ({ text, onRemove }: BadgeProps) => (
  <span className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-white bg-blue-500 rounded-full">
    {text}
    <button
      type="button"
      onClick={onRemove}
      className="ml-2 text-white hover:text-gray-200 focus:outline-none"
    >
      &times;
    </button>
  </span>
);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredtech, setRequiredTech] = useState<string[]>([
    "React",
    "Express",
  ]);
  const [techInput, setTechInput] = useState("");
  const [whatyouwillgain, setWhatYouWillGain] = useState<string[]>([
    "Build a full-stack application",
    "Learn state management",
  ]);
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState("");
  const [credits, setCredits] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const token = user?.token;
  const today = new Date().toISOString().split("T")[0];
  const mutation = useMutation({
    mutationFn: (postData: {
      title: string;
      description: string;
      requiredtech: string[];
      whatyouwillgain: string[];
      duaration: string;
      credits: string;
      noofparticipants: string;
    }) => createPostService(postData, token),
    onSuccess: () => {
      alert("Post created successfully!");
      resetForm();
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        alert((error as any).message || "Failed to create post.");
      } else {
        alert("Failed to create post.");
      }
    },
  });

  const handleSubmit = () => {
    // e.preventDefault();
    mutation.mutate({
      title,
      description,
      requiredtech,
      whatyouwillgain,
      credits,
      duaration: duration,
      noofparticipants: participants,
    });
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      addTechnology();
    }
  };

  const addTechnology = () => {
    const tech = techInput.trim();
    if (tech && !requiredtech.includes(tech)) {
      setRequiredTech([...requiredtech, tech]);
    }
    setTechInput("");
  };

  const removeTechnology = (techToRemove: string) => {
    setRequiredTech(requiredtech.filter((t) => t !== techToRemove));
  };

  const handleGainChange = (index: number, value: string) => {
    const updated = [...whatyouwillgain];
    updated[index] = value;
    setWhatYouWillGain(updated);
  };

  const addGain = () => setWhatYouWillGain([...whatyouwillgain, ""]);
  const removeGain = (index: number) =>
    setWhatYouWillGain(whatyouwillgain.filter((_, i) => i !== index));

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRequiredTech(["React", "Express"]);
    setTechInput("");
    setWhatYouWillGain([
      "Build a full-stack application",
      "Learn state management",
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create a New Post
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className=" col-span-2">
          {/* --- Title --- */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="title">Title</Label>
            <UserTaggingInput setTitle={setTitle} title={title} />
          </div>

          {/* --- Description --- */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project, goals, and expectations."
              className="w-full border border-gray-500 p-3 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* --- Required Technologies --- */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="technologies">Required Technologies</Label>
            <div className="p-3 border border-gray-500 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2 mb-3">
                <Input
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  placeholder="Enter tech and press Enter"
                  className="h-11 border-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <Button type="button" onClick={addTechnology}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap mt-2">
                {requiredtech.map((tech, index) => (
                  <Badge
                    key={index}
                    text={tech}
                    onRemove={() => removeTechnology(tech)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* --- What You'll Gain --- */}
          <div className="space-y-2 mb-6">
            <Label>What You'll Gain</Label>
            <div className="space-y-3">
              {whatyouwillgain.map((gain, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={gain}
                    onChange={(e) => handleGainChange(index, e.target.value)}
                    placeholder={`Benefit #${index + 1}`}
                    className="h-11 flex-grow border-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeGain(index)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addGain}
              className="mt-3 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              + Add More
            </Button>
          </div>

          {/* --- Submit Button --- */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md"
            >
              {mutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </div>
        <div>
          <div className="space-y-2 mb-6">
            <Label htmlFor="duration">Duration</Label>

            <Input
              id="schedule"
              type="date"
              min={today} // Prevents selecting past dates
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-500 p-3 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2 mb-6">
            <Label htmlFor="participants">Number of Participants</Label>
            <Input
              id="participants"
              type="number"
              min="1"
              max="20" // ✅ limit max to 20
              value={participants}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1 && value <= 20) {
                  setParticipants(value.toString());
                } else if (value > 20) {
                  setParticipants("20");
                } else {
                  setParticipants(""); 
                }
              }}
              placeholder="Enter number of participants (1-20)"
              className="w-full border border-gray-500 p-3 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2 mb-6">
            <Label htmlFor="credits">Credit Points</Label>
            <Select value={credits} onValueChange={(val) => setCredits(val)}>
              <SelectTrigger className="h-11 w-full border-gray-500 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select Credit Points" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
