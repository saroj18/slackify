export function compareEditorContent(
  original: any,
  updated: any
): Array<{ index: number; newData: any }> {
  const differences: Array<{ index: number; newData: any }> = [];

  // Helper function to compare two nodes
  const compareNodes = (node1: Node, node2: Node, index: number) => {
    if (JSON.stringify(node1) !== JSON.stringify(node2)) {
      differences.push({ index, newData: node2 });
    }
  };

  // Loop through the content arrays of both original and updated data
  original?.content?.forEach((originalNode: any, index: any) => {
    const updatedNode = updated.content[index];
    if (updatedNode) {
      compareNodes(originalNode, updatedNode, index);
    } else {
      // If updated content has fewer nodes, record the difference
      differences.push({ index, newData: updatedNode });
    }
  });

  // Check if updated content has extra nodes
  updated.content
    .slice(original?.content?.length)
    .forEach((newNode: any, index: any) => {
      differences.push({
        index: original?.content?.length + index,
        newData: newNode,
      });
    });

  return differences;
}
