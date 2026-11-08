type BoxMeshProps = {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
  metalness?: number;
};

export function BoxMesh({ args, position, color, metalness = 0 }: BoxMeshProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={0.58} />
    </mesh>
  );
}
