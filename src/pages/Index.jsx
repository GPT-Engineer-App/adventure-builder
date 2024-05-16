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
  const [scenarios, setScenarios] = useState([initialScenario]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [editingScenario, setEditingScenario] = useState(initialScenario);

  const handleChoice = (choice, index) => {
    const nextIndex = scenarios[index][choice].next;
    if (nextIndex !== null && nextIndex < scenarios.length) {
      setCurrentScenarioIndex(nextIndex);
    } else {
      alert("End of this path. Please create more scenarios.");
    }
  };

  const handleEditChange = (path, field, value) => {
    if (path === "text") {
      setEditingScenario((prev) => ({
        ...prev,
        text: value,
      }));
    } else {
      setEditingScenario((prev) => ({
        ...prev,
        [path]: {
          ...prev[path],
          [field]: value,
        },
      }));
    }
  };

  const saveScenario = () => {
    setScenarios((prev) => {
      const newScenarios = [...prev];
      newScenarios[currentScenarioIndex] = editingScenario;
      if (editingScenario.left.next === null) {
        newScenarios.push({ text: "", left: { text: "", img: "", next: null }, right: { text: "", img: "", next: null } });
        newScenarios[currentScenarioIndex].left.next = newScenarios.length - 1;
      }
      if (editingScenario.right.next === null) {
        newScenarios.push({ text: "", left: { text: "", img: "", next: null }, right: { text: "", img: "", next: null } });
        newScenarios[currentScenarioIndex].right.next = newScenarios.length - 1;
      }
      return newScenarios;
    });
    setMode("player");
  };

  return (
    <Box p={4}>
      <Button position="absolute" top={4} right={4} onClick={() => setMode(mode === "player" ? "creator" : "player")}>
        {mode === "player" ? "Create Scenario" : "Play"}
      </Button>
      {mode === "player" ? (
        <VStack spacing={4}>
          <Text fontSize="2xl">{scenarios[currentScenarioIndex].text}</Text>
          <Flex>
            <Box onClick={() => handleChoice("left", currentScenarioIndex)} cursor="pointer">
              <Image src={scenarios[currentScenarioIndex].left.img} alt="Left Path" />
              <Text>{scenarios[currentScenarioIndex].left.text}</Text>
            </Box>
            <Box onClick={() => handleChoice("right", currentScenarioIndex)} cursor="pointer">
              <Image src={scenarios[currentScenarioIndex].right.img} alt="Right Path" />
              <Text>{scenarios[currentScenarioIndex].right.text}</Text>
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
              <Input type="file" onChange={(e) => handleEditChange("left", "img", URL.createObjectURL(e.target.files[0]))} placeholder="Left choice image URL" />
            </VStack>
            <VStack>
              <Input value={editingScenario.right.text} onChange={(e) => handleEditChange("right", "text", e.target.value)} placeholder="Right choice text" />
              <Input type="file" onChange={(e) => handleEditChange("right", "img", URL.createObjectURL(e.target.files[0]))} placeholder="Right choice image URL" />
            </VStack>
          </Flex>
          <Button onClick={saveScenario}>Save Scenario</Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
