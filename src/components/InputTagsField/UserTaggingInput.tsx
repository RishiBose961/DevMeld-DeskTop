import { User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface UserType {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

interface Tag {
  id: string;
  username: string;
  displayName: string;
  start: number;
  end: number;
}

export default function UserTaggingInput({
  setTitle,
  title,
}: {
  setTitle: (title: string) => void;
  title: string;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async (): Promise<UserType[]> => {
    const res = await fetch(
      `http://localhost:5000/api/search/user?username=${searchQuery}`
    );
    if (!res.ok) throw new Error("Failed fetching users");

    const json = await res.json();

    const users = Array.isArray(json) ? json : [json];

    return users.map((u) => ({
      id: u._id,
      username: u.username.replace("@", ""),
      displayName: u.fullName,
      avatar: u.avatar ?? undefined,
    }));
  };

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["search-users", searchQuery],
    queryFn: fetchUsers,
    enabled: searchQuery.length > 0,
  });

  const findMentionStart = (text: string, cursorPos: number): number | null => {
    for (let i = cursorPos - 1; i >= 0; i--) {
      if (text[i] === "@") return i;
      if (text[i] === " " || text[i] === "\n") break;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    setTitle(value);

    const mentionStartPos = findMentionStart(value, cursorPos);

    if (mentionStartPos !== null) {
      const mentionText = value.slice(mentionStartPos + 1, cursorPos).trim();
      setMentionStart(mentionStartPos);
      setSearchQuery(mentionText);
      setShowSuggestions(!!mentionText);
    } else {
      setShowSuggestions(false);
      setMentionStart(null);
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (user: UserType) => {
    if (mentionStart === null) return;

    const cursorPos = inputRef.current?.selectionStart || 0;
    const beforeMention = title.slice(0, mentionStart);
    const afterMention = title.slice(cursorPos);
    const mentionTag = `@${user.username}`;

    const newTitle = beforeMention + mentionTag + afterMention;
    const newTag: Tag = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      start: mentionStart,
      end: mentionStart + mentionTag.length,
    };

    setTitle(newTitle);
    setTags((prev) => [...prev, newTag]);
    setShowSuggestions(false);
    setMentionStart(null);
    setSearchQuery("");

    setTimeout(() => {
      inputRef.current?.focus();
      const newCursorPos = mentionStart + mentionTag.length;
      inputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
      case "Tab":
        e.preventDefault();
        if (suggestions[activeSuggestion]) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const removeTag = (tagToRemove: Tag) => {
    const newTitle =
      title.slice(0, tagToRemove.start) + title.slice(tagToRemove.end);
    setTitle(newTitle);
    setTags((prev) => prev.filter((tag) => tag.id !== tagToRemove.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter title... Use @ to mention users"
          className="w-full border-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-4 py-3 border focus:ring-2 outline-none transition-all duration-200 text-lg"
        />

        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto"
          >
            {isLoading && (
              <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
            )}

            {!isLoading && suggestions.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No users found
              </div>
            )}

            {Array.isArray(suggestions) && suggestions.map((user, index) => (
              <div
                key={user.id}
                onClick={() => handleSuggestionClick(user)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  index === activeSuggestion
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  <User size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {user.displayName}
                  </div>
                  <div className="text-sm text-gray-500">@{user.username}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Tagged Users:
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...new Map(tags.map((tag) => [tag.id, tag])).values()].map(
              (tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <User size={14} />
                  {tag.displayName}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
