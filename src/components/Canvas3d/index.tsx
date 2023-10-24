import { useEffect, useRef, useState } from "react";
import lec3d from "@trickle/lec3d";
import style from "./index.module.css";

const Canvas3d = () => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 200, y: 0, z: 0 })
  useEffect(() => {
    const { scene, renderer, camera, mountTo, refresh, addControls } =
      lec3d.init({
        axesHelperConfigs: {
          length: 10000,
        },
      });

    // 添加鼠标控制，缩放、旋转等
    addControls();

    // 导入 GLTF 3d 模型文件
    lec3d.loadGLTF({
      modelPath: "models/human/scene.gltf",
      options: {
        position: {
          x: -10,
        },
        rotation: {},
      },
      callback: (gltf, model) => {
        // 添加到场景中
        // model.position.x = position.x;
        // model.position.y = position.y;
        // model.position.z = position.z;
        document.onkeydown = function (e) {
          const key = e.key
          if (key === 'ArrowUp') {
            model.position.x = position.x;
            model.position.y = position.y;
            model.position.z = position.z + 10;
            position.z += 10;
          } else if (key === 'ArrowDown') {
            model.position.x = position.x;
            model.position.y = position.y;
            model.position.z = position.z - 10;
            position.z -= 10;
          } else if (key === 'ArrowLeft') {
            model.position.x = position.x + 10;
            model.position.y = position.y;
            model.position.z = position.z;
            position.x += 10;
          } else if (key === 'ArrowRight') {
            model.position.x = position.x - 10;
            model.position.y = position.y;
            model.position.z = position.z;
            position.x -= 10;
          }
        }
        model.position.x = position.x;
        model.position.y = position.y;
        model.position.z = position.z;
        scene.add(model);
      },
    });


    // 挂载到一个 DOM 元素上
    console.log("????", elementRef);
    mountTo(elementRef.current);
  }, []);

  return <div className={style["canvas-3d"]} ref={elementRef}></div>;
};

export default Canvas3d;
