import { useState } from "react";
import { Box, Button, Flex, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const initialScenario = {
  text: "You are at a crossroads. Do you take the left path or the right path?",
  left: {
    text: "Take the left path",
    img: "https://images.unsplash.com/photo-1519401706-5cf17f6e70de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsZWZ0JTIwcGF0aHxlbnwwfHx8fDE3MTU4NTMxNTl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    next: null,
  },
  right: {
    text: "Take the right path",
    img: "https://images.unsplash.com/photo-1519401706-5cf17f6e70de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyaWdodCUyMHBhdGh8ZW58MHx8fHwxNzE1ODUzMTU5fDA&ixlib=rb-4.0.3&q=80&w=1080",
    next: null,
  },
};

const Index = () => {
  const [mode, setMode] = useState("player");
  const [scenario, setScenario] = useState(initialScenario);
  const [currentScenario, setCurrentScenario] = useState(scenario);
  const [editingScenario, setEditingScenario] = useState(initialScenario);

  const handleChoice = (choice) => {
    if (currentScenario[choice].next) {
      setCurrentScenario(currentScenario[choice].next);
    } else {
      alert("End of this path. Please create more scenarios.");
    }
  };

  const handleEditChange = (path, field, value) => {
    setEditingScenario((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        [field]: value,
      },
    }));
  };

  const saveScenario = () => {
    setScenario(editingScenario);
    setCurrentScenario(editingScenario);
    setMode("player");
  };

  return (
    <Box p={4}>
      <Button position="absolute" top={4} right={4} onClick={() => setMode(mode === "player" ? "creator" : "player")}>
        {mode === "player" ? "Create Scenario" : "Play"}
      </Button>
      {mode === "player" ? (
        <VStack spacing={4}>
          <Text fontSize="2xl">{currentScenario.text}</Text>
          <Flex>
            <Box onClick={() => handleChoice("left")} cursor="pointer">
              <Image src={currentScenario.left.img} alt="Left Path" />
              <Text>{currentScenario.left.text}</Text>
            </Box>
            <Box onClick={() => handleChoice("right")} cursor="pointer">
              <Image src={currentScenario.right.img} alt="Right Path" />
              <Text>{currentScenario.right.text}</Text>
            </Box>
          </Flex>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text fontSize="2xl">Edit Your Scenario</Text>
          <Textarea value={editingScenario.text} onChange={(e) => handleEditChange("text", "text", e.target.value)} placeholder="Main scenario text" />
          <Flex>
            <VStack>
              <Input value={editingScenario.left.text} onChange={(e) => handleEditChange("left", "text", e.target.value)} placeholder="Left choice text" />
              <Input value={editingScenario.left.img} onChange={(e) => handleEditChange("left", "img", e.target.value)} placeholder="Left choice image URL" />
            </VStack>
            <VStack>
              <Input value={editingScenario.right.text} onChange={(e) => handleEditChange("right", "text", e.target.value)} placeholder="Right choice text" />
              <Input value={editingScenario.right.img} onChange={(e) => handleEditChange("right", "img", e.target.value)} placeholder="Right choice image URL" />
            </VStack>
          </Flex>
          <Button onClick={saveScenario}>Save Scenario</Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
