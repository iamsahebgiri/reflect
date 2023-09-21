import { Command } from "cmdk";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import useTextToSpeech from "@/hooks/use-text-to-speech";
import { useCurrentThought, useCommandMenuStore, useThoughts } from "@/store";
import { useTheme } from "next-themes";

export default function CommandMenu() {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const page = pages[pages.length - 1];

  const { theme, setTheme } = useTheme();
  const { voices, selectedVoice, setVoice } = useTextToSpeech();

  const { currentThoughtId } = useCurrentThought();
  const { open, setOpen } = useCommandMenuStore();
  const deleteThought = useThoughts((state) => state.delete);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  function closeModal() {
    setOpen(false);
    setTimeout(() => {
      setSearch("");
      setPages([]);
    }, 200);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-surface text-left align-middle shadow-xl transition-all border border-border">
                  <Command
                    onKeyDown={(e) => {
                      // Escape goes to previous page
                      // Backspace goes to previous page when search is empty
                      if (
                        e.key === "Escape" ||
                        (e.key === "Backspace" && !search)
                      ) {
                        e.preventDefault();
                        setPages((pages) => pages.slice(0, -1));
                      }
                    }}
                    className="divide-y divide-border"
                  >
                    <Command.Input
                      value={search}
                      onValueChange={setSearch}
                      className="outline-none w-full bg-surface py-3 border-none focus:ring-0 rounded-t-lg placeholder:text-sm"
                      placeholder="Search for commands..."
                    />
                    <Command.List className="max-h-96 overflow-auto p-2 bg-surface">
                      {!page && (
                        <>
                          {currentThoughtId !== null && (
                            <Command.Group heading="Thoughts">
                              {/* TODO: Add edit feature */}
                              {/* <Command.Item
                                onSelect={() => {
                                  console.log(currentThoughtId);
                                }}
                              >
                                Edit
                              </Command.Item> */}
                              <Command.Item
                                onSelect={() => {
                                  deleteThought(currentThoughtId);
                                  closeModal();
                                }}
                              >
                                Delete
                              </Command.Item>
                            </Command.Group>
                          )}

                          <Command.Group heading="Settings">
                            <Command.Item
                              onSelect={() => {
                                setPages([...pages, "themes"]);
                                setSearch("");
                              }}
                            >
                              Change theme...
                            </Command.Item>
                            <Command.Item
                              onSelect={() => {
                                setPages([...pages, "voice"]);
                                setSearch("");
                              }}
                            >
                              Change voice...
                            </Command.Item>
                            <Command.Item
                              onSelect={() => {
                                setPages([...pages, "speech-lang"]);
                                setSearch("");
                              }}
                            >
                              Change speech language...
                            </Command.Item>
                          </Command.Group>
                        </>
                      )}

                      {page === "themes" && (
                        <>
                          {["light", "dark", "system"].map((item) => (
                            <Command.Item
                              key={item}
                              onSelect={() => {
                                setTheme(item);
                                closeModal();
                              }}
                            >
                              {item[0].toUpperCase() + item.slice(1)}
                              {item === theme && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-subtitle/80"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m8.5 16.586l-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                                  />
                                </svg>
                              )}
                            </Command.Item>
                          ))}
                        </>
                      )}

                      {page === "voice" && (
                        <>
                          {voices.map((voice, index) => (
                            <Command.Item
                              key={`${index}-${voice.name}`}
                              onSelect={() => {
                                setVoice(voice.name);
                                closeModal();
                              }}
                            >
                              {voice.name}
                              {selectedVoice &&
                                voice.name === selectedVoice.name && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-700"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="m8.5 16.586l-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                                    />
                                  </svg>
                                )}
                            </Command.Item>
                          ))}
                        </>
                      )}

                      {page === "speech-lang" && (
                        <>
                          <Command.Item>Lang 1</Command.Item>
                          <Command.Item>Lang 2</Command.Item>
                        </>
                      )}
                    </Command.List>
                  </Command>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
