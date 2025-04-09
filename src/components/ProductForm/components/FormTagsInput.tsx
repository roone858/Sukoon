
type FormTagsInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
  tagInput: string;
  setTagInput: (value: string) => void;
  error?: string;
};

export const FormTagsInput = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
  error,
}: FormTagsInputProps) => {
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        الكلمات المفتاحية
      </label>
      <div
        className={`border rounded-md p-2 focus-within:ring-2 ${
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-300 focus-within:ring-purple-500"
        }`}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1.5 text-purple-500 hover:text-purple-700 focus:outline-none"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="اكتب الكلمات المفتاحية ثم اضغط Enter أو Tab"
          className="w-full p-1 border-0 focus:ring-0 focus:outline-none bg-transparent"
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        افصل بين الكلمات بضغط Enter أو Tab
      </p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};