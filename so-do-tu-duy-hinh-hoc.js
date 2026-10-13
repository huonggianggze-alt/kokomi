    const groups = [
      { id: "flat", title: "Hình học phẳng", icon: "📐", color: "#e979ad", topicIds: ["plane", "triangle", "quadrilateral", "circle"] },
      { id: "space", title: "Hình học không gian", icon: "🧊", color: "#6389eb", topicIds: ["solid"] },
      { id: "measure", title: "Đo lường", icon: "✳", color: "#e979ad", topicIds: ["measurement"] }
    ];

    const topics = [
      {
        id: "plane", group: "flat", icon: "📐", color: "#e979ad",
        title: "Khái niệm cơ bản", items: ["Điểm & đường thẳng", "Góc", "Đa giác"],
        details: [
          ["Điểm, đường thẳng, đoạn thẳng", "Là những khái niệm cơ bản để mô tả vị trí và hình dạng trên một mặt phẳng."],
          ["Góc", "Được tạo bởi hai tia chung gốc. Góc nhọn < 90°, góc vuông = 90°, góc tù nằm giữa 90° và 180°."],
          ["Đa giác", "Hình phẳng khép kín gồm các đoạn thẳng; tổng số đo các góc trong là (n − 2) × 180°."]
        ]
      },
      {
        id: "triangle", group: "flat", icon: "🔺", color: "#6389eb",
        title: "Tam giác", items: ["3 cạnh · 3 góc", "Đường cao", "Đồng dạng"],
        details: [
          ["Tổng ba góc", "Tổng số đo ba góc trong mọi tam giác bằng 180°."],
          ["Diện tích", "S = (đáy × chiều cao) / 2. Đường cao vuông góc với cạnh đáy hoặc phần kéo dài của cạnh ấy."],
          ["Tam giác đồng dạng", "Các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ. Có thể nhận biết qua góc–góc, cạnh–góc–cạnh hoặc cạnh–cạnh–cạnh."]
        ]
      },
      {
        id: "quadrilateral", group: "flat", icon: "▱", color: "#e979ad",
        title: "Tứ giác", items: ["Hình bình hành", "Hình chữ nhật", "Hình thang"],
        details: [
          ["Tổng bốn góc", "Tổng số đo các góc trong một tứ giác bằng 360°."],
          ["Hình bình hành", "Các cạnh đối song song và bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường."],
          ["Diện tích thường gặp", "Hình chữ nhật: S = dài × rộng. Hình thang: S = (đáy lớn + đáy bé) × chiều cao / 2."]
        ]
      },
      {
        id: "circle", group: "flat", icon: "◉", color: "#6389eb",
        title: "Đường tròn", items: ["Bán kính & đường kính", "Chu vi", "Diện tích"],
        details: [
          ["Bán kính và đường kính", "Bán kính r nối tâm với một điểm trên đường tròn. Đường kính d = 2r."],
          ["Chu vi", "C = 2πr = πd."],
          ["Diện tích hình tròn", "S = πr². Khi tính gần đúng, thường lấy π ≈ 3,14."]
        ]
      },
      {
        id: "solid", group: "space", icon: "🧊", color: "#6389eb",
        title: "Hình khối", items: ["Lập phương", "Lăng trụ", "Hình trụ"],
        details: [
          ["Hình lập phương", "Có 6 mặt vuông bằng nhau, 12 cạnh bằng nhau. Thể tích V = a³; diện tích toàn phần S = 6a²."],
          ["Hình hộp chữ nhật", "Thể tích V = dài × rộng × cao; diện tích toàn phần S = 2(ab + bc + ca)."],
          ["Hình trụ", "Thể tích V = πr²h; diện tích xung quanh Sxq = 2πrh."]
        ]
      },
      {
        id: "measurement", group: "measure", icon: "✳", color: "#e979ad",
        title: "Công thức đo lường", items: ["Chu vi", "Diện tích", "Thể tích"],
        details: [
          ["Chu vi", "Độ dài đường bao quanh một hình. Cộng độ dài các cạnh hoặc dùng công thức riêng của hình."],
          ["Diện tích", "Đo phần mặt phẳng được hình bao phủ; luôn ghi đơn vị vuông như cm², m²."],
          ["Thể tích", "Đo phần không gian một vật chiếm; ghi đơn vị khối như cm³, m³."]
        ]
      }
    ];

    const map = document.getElementById("mindMap");
    const svg = document.getElementById("connections");
    const searchInput = document.getElementById("searchInput");
    const detailTitle = document.getElementById("detailTitle");
    const detailContent = document.getElementById("detailContent");
    const emptyState = document.getElementById("emptyState");
    const groupsContainer = document.getElementById("treeGroups");
    const nodes = new Map();
    const groupNodes = new Map();
    let selectedId = null;

    function createTree() {
      groups.forEach((group) => {
        const section = document.createElement("section");
        section.className = "tree-group";
        section.dataset.group = group.id;
        section.style.setProperty("--group-color", group.color);
        section.setAttribute("aria-label", group.title);

        const heading = document.createElement("div");
        heading.className = "group-node";
        heading.dataset.groupHeading = group.id;
        const icon = document.createElement("span");
        icon.className = "group-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = group.icon;
        const title = document.createElement("span");
        title.textContent = group.title;
        heading.append(icon, title);

        const list = document.createElement("div");
        list.className = "topic-list";
        group.topicIds.forEach((topicId) => {
          const topic = topics.find((entry) => entry.id === topicId);
          const button = document.createElement("button");
          button.type = "button";
          button.className = "topic-node";
          button.dataset.id = topic.id;
          button.style.setProperty("--branch-color", topic.color);
          button.style.setProperty("--group-color", group.color);
          button.setAttribute("aria-label", `${topic.title}: ${topic.items.join(", ")}`);

          const topicHeading = document.createElement("span");
          topicHeading.className = "topic-heading";
          const topicIcon = document.createElement("span");
          topicIcon.className = "topic-icon";
          topicIcon.setAttribute("aria-hidden", "true");
          topicIcon.textContent = topic.icon;
          const topicTitle = document.createElement("span");
          topicTitle.className = "topic-title";
          topicTitle.textContent = topic.title;
          topicHeading.append(topicIcon, topicTitle);

          const items = document.createElement("span");
          items.className = "topic-items";
          topic.items.forEach((item) => {
            const chip = document.createElement("span");
            chip.textContent = item;
            items.append(chip);
          });

          button.append(topicHeading, items);
          button.addEventListener("click", () => selectTopic(topic.id));
          list.append(button);
          nodes.set(topic.id, button);
        });

        section.append(heading, list);
        groupsContainer.append(section);
        groupNodes.set(group.id, section);
      });
    }

    function selectTopic(id) {
      const topic = topics.find((entry) => entry.id === id);
      if (!topic) return;
      selectedId = id;
      detailTitle.textContent = topic.title;
      detailContent.replaceChildren();
      topic.details.forEach(([heading, description]) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = `${heading}: `;
        paragraph.append(strong, document.createTextNode(description));
        detailContent.append(paragraph);
      });
      updateTree();
    }

    function drawConnections() {
      const mapRect = map.getBoundingClientRect();
      const centerRect = document.getElementById("centralNode").getBoundingClientRect();
      const visibleGroups = groups.filter((group) => !groupNodes.get(group.id).hidden);
      svg.setAttribute("viewBox", `0 0 ${map.clientWidth} ${map.clientHeight}`);
      svg.replaceChildren();
      if (visibleGroups.length === 0) return;

      const rootX = centerRect.left + centerRect.width / 2 - mapRect.left;
      const rootY = centerRect.bottom - mapRect.top;
      const groupPoints = visibleGroups.map((group) => {
        const headingRect = groupNodes.get(group.id).querySelector(".group-node").getBoundingClientRect();
        return {
          group,
          x: headingRect.left + headingRect.width / 2 - mapRect.left,
          y: headingRect.top - mapRect.top
        };
      });
      const junctionY = rootY + Math.max(22, (groupPoints[0].y - rootY) * 0.48);
      const mainPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      mainPath.setAttribute("d", `M ${rootX} ${rootY} V ${junctionY} M ${groupPoints[0].x} ${junctionY} H ${groupPoints[groupPoints.length - 1].x}`);
      mainPath.classList.add("connection");
      mainPath.style.setProperty("--branch-color", "#8b9fe5");
      svg.append(mainPath);

      groupPoints.forEach(({ group, x, y }) => {
        const groupPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        groupPath.setAttribute("d", `M ${x} ${junctionY} V ${y}`);
        groupPath.classList.add("connection");
        groupPath.dataset.groupPath = group.id;
        groupPath.style.setProperty("--branch-color", group.color);
        svg.append(groupPath);
      });
    }

    function updateTree() {
      const query = searchInput.value.trim().toLocaleLowerCase("vi");
      let visibleCount = 0;

      topics.forEach((topic) => {
        const node = nodes.get(topic.id);
        const groupTitle = groups.find((group) => group.id === topic.group).title;
        const searchableText = `${groupTitle} ${topic.title} ${topic.items.join(" ")} ${topic.details.flat().join(" ")}`;
        const matches = !query || searchableText.toLocaleLowerCase("vi").includes(query);
        node.hidden = !matches;
        node.classList.toggle("is-active", topic.id === selectedId);
        visibleCount += Number(matches);
      });

      groups.forEach((group) => {
        const hasVisibleTopic = group.topicIds.some((id) => !nodes.get(id).hidden);
        groupNodes.get(group.id).hidden = !hasVisibleTopic;
      });

      emptyState.classList.toggle("visible", visibleCount === 0);
      drawConnections();
    }

    searchInput.addEventListener("input", updateTree);
    document.getElementById("resetButton").addEventListener("click", () => {
      searchInput.value = "";
      updateTree();
      if (selectedId) selectTopic(selectedId);
    });
    window.addEventListener("resize", drawConnections);

    createTree();
    updateTree();
    selectTopic(topics[0].id);
