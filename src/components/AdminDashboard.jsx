import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { uploadToCloudinary, getRemainingUploads } from "../utils/cloudinary";
import * as defaultContent from "../data/content";

const getDefaultAdminContent = () => ({
  characters: defaultContent.characters,
  projects: defaultContent.projects,
  achievements: defaultContent.achievements,
  experience: defaultContent.experience,
});

const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    }),
  ]);

export default function AdminDashboard() {
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("dipak");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [remainingUploads, setRemainingUploads] = useState(3);

  useEffect(() => {
    loadContent();
    const interval = setInterval(() => {
      setRemainingUploads(getRemainingUploads());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = async () => {
    try {
      const docRef = doc(db, "portfolio", "content");
      const docSnap = await withTimeout(getDoc(docRef), 6000, "Firestore load");
      
      if (docSnap.exists()) {
        setContent(docSnap.data());
      } else {
        const initial = getDefaultAdminContent();
        setContent(initial);
        await withTimeout(setDoc(docRef, initial), 6000, "Firestore setup");
        setContent(initial);
      }
    } catch (error) {
      console.error("Load error:", error);
      setContent(getDefaultAdminContent());
      setMessage("Firebase is slow or blocked. Showing default content for this session.");
    }
  };

  const saveContent = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "portfolio", "content");
      await setDoc(docRef, content);
      setMessage("✅ Saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setMessage("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, path) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    try {
      const result = await uploadToCloudinary(file);
      
      // Update the image URL in content
      const keys = path.split(".");
      let obj = content;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = result.url;
      
      setContent({ ...content });
      setMessage(`✅ Image uploaded! ${getRemainingUploads()} uploads remaining this minute`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const updateField = (path, value) => {
    const keys = path.split(".");
    const newContent = JSON.parse(JSON.stringify(content));
    let obj = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const addSkill = (character) => {
    const newSkill = { name: "New Skill", percent: 50, sub: "" };
    const newContent = { ...content };
    newContent.characters[character].skills.push(newSkill);
    setContent(newContent);
  };

  const removeSkill = (character, index) => {
    const newContent = { ...content };
    newContent.characters[character].skills.splice(index, 1);
    setContent(newContent);
  };

  const addProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      title: "New Project",
      summary: "Project description",
      stack: ["Tech1", "Tech2"],
      image: "/projects/placeholder.png",
      link: "https://example.com",
    };
    const newContent = { ...content };
    newContent.projects.push(newProject);
    setContent(newContent);
  };

  const removeProject = (index) => {
    const newContent = { ...content };
    newContent.projects.splice(index, 1);
    setContent(newContent);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!content) return <div className="admin-loading">Loading...</div>;

  const character = content.characters[activeTab];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>⚡ Portfolio CMS</h1>
        <div className="admin-header-actions">
          <span className="admin-user">Signed in</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-tabs">
        <button
          className={activeTab === "dipak" ? "active" : ""}
          onClick={() => setActiveTab("dipak")}
        >
          Dipak Skills
        </button>
        <button
          className={activeTab === "sagar" ? "active" : ""}
          onClick={() => setActiveTab("sagar")}
        >
          Sagar Skills
        </button>
        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile & Bio
        </button>
        <button
          className={activeTab === "images" ? "active" : ""}
          onClick={() => setActiveTab("images")}
        >
          Images ({remainingUploads}/3 remaining)
        </button>
      </div>

      <div className="admin-content">
        {(activeTab === "dipak" || activeTab === "sagar") && (
          <div className="admin-section">
            <h2>{character.name} - Skills</h2>
            <div className="skills-editor">
              {character.skills.map((skill, idx) => (
                <div key={idx} className="skill-row">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateField(`characters.${activeTab}.skills.${idx}.name`, e.target.value)}
                    placeholder="Skill name"
                  />
                  <input
                    type="number"
                    value={skill.percent}
                    onChange={(e) => updateField(`characters.${activeTab}.skills.${idx}.percent`, parseInt(e.target.value))}
                    min="0"
                    max="100"
                    placeholder="0-100%"
                  />
                  <input
                    type="text"
                    value={skill.sub || ""}
                    onChange={(e) => updateField(`characters.${activeTab}.skills.${idx}.sub`, e.target.value)}
                    placeholder="Optional note"
                  />
                  <button onClick={() => removeSkill(activeTab, idx)} className="btn-remove">❌</button>
                </div>
              ))}
              <button onClick={() => addSkill(activeTab)} className="btn-add">+ Add Skill</button>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="admin-section">
            <h2>Projects</h2>
            <div className="projects-editor">
              {content.projects.map((project, idx) => (
                <div key={idx} className="project-card-editor">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateField(`projects.${idx}.title`, e.target.value)}
                    placeholder="Project title"
                  />
                  <textarea
                    value={project.summary}
                    onChange={(e) => updateField(`projects.${idx}.summary`, e.target.value)}
                    placeholder="Project summary"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => updateField(`projects.${idx}.link`, e.target.value)}
                    placeholder="Project URL"
                  />
                  <input
                    type="text"
                    value={project.stack.join(", ")}
                    onChange={(e) => updateField(`projects.${idx}.stack`, e.target.value.split(",").map(s => s.trim()))}
                    placeholder="Tech stack (comma separated)"
                  />
                  <input
                    type="text"
                    value={project.image}
                    onChange={(e) => updateField(`projects.${idx}.image`, e.target.value)}
                    placeholder="Image URL"
                  />
                  <button onClick={() => removeProject(idx)} className="btn-remove">🗑️ Remove Project</button>
                </div>
              ))}
              <button onClick={addProject} className="btn-add">+ Add Project</button>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="admin-section">
            <h2>Profile & Bio</h2>
            <div className="profile-editor">
              <h3>Dipak</h3>
              <input
                type="text"
                value={content.characters.dipak.name}
                onChange={(e) => updateField("characters.dipak.name", e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                value={content.characters.dipak.role}
                onChange={(e) => updateField("characters.dipak.role", e.target.value)}
                placeholder="Role/Title"
              />
              {content.characters.dipak.bio.map((line, idx) => (
                <textarea
                  key={idx}
                  value={line}
                  onChange={(e) => {
                    const newBio = [...content.characters.dipak.bio];
                    newBio[idx] = e.target.value;
                    updateField("characters.dipak.bio", newBio);
                  }}
                  rows={2}
                />
              ))}

              <h3>Sagar</h3>
              <input
                type="text"
                value={content.characters.sagar.name}
                onChange={(e) => updateField("characters.sagar.name", e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                value={content.characters.sagar.role}
                onChange={(e) => updateField("characters.sagar.role", e.target.value)}
                placeholder="Role/Title"
              />
              {content.characters.sagar.bio.map((line, idx) => (
                <textarea
                  key={idx}
                  value={line}
                  onChange={(e) => {
                    const newBio = [...content.characters.sagar.bio];
                    newBio[idx] = e.target.value;
                    updateField("characters.sagar.bio", newBio);
                  }}
                  rows={2}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <div className="admin-section">
            <h2>Image Manager</h2>
            <p className="upload-info">
              📸 Upload to Cloudinary • Max 3 per minute • {remainingUploads} remaining
            </p>
            
            <div className="image-upload-grid">
              <div className="upload-item">
                <label>Dipak Photo</label>
                <img src={content.characters.dipak.photo} alt="Dipak" className="preview" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "characters.dipak.photo")}
                  disabled={uploading || remainingUploads === 0}
                />
              </div>

              <div className="upload-item">
                <label>Sagar Photo</label>
                <img src={content.characters.sagar.photo} alt="Sagar" className="preview" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "characters.sagar.photo")}
                  disabled={uploading || remainingUploads === 0}
                />
              </div>

              {content.projects.map((project, idx) => (
                <div key={idx} className="upload-item">
                  <label>{project.title} Image</label>
                  <img src={project.image} alt={project.title} className="preview" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, `projects.${idx}.image`)}
                    disabled={uploading || remainingUploads === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="admin-footer">
        <button onClick={saveContent} disabled={saving} className="btn-save-main">
          {saving ? "💾 Saving..." : "💾 Save All Changes"}
        </button>
      </div>
    </div>
  );
}
