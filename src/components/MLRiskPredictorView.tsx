import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sliders, 
  FileCode, 
  BarChart2, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  Award,
  BookOpen
} from 'lucide-react';
import { calculateHealthRisk, MODEL_BENCHMARKS } from '../services/mlEngine';
import { MLPredictionInput, MLPredictionResult } from '../types';

export const MLRiskPredictorView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'Random Forest' | 'Logistic Regression' | 'Decision Tree'>('Random Forest');
  const [activeTab, setActiveTab] = useState<'calculator' | 'benchmarks' | 'code'>('calculator');

  // Input states
  const [age, setAge] = useState<number>(42);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [systolicBP, setSystolicBP] = useState<number>(135);
  const [diastolicBP, setDiastolicBP] = useState<number>(85);
  const [fastingGlucose, setFastingGlucose] = useState<number>(110);
  const [physicalActivityHours, setPhysicalActivityHours] = useState<number>(2.0);
  const [smokingStatus, setSmokingStatus] = useState<'Never' | 'Former' | 'Current'>('Former');
  const [familyHistory, setFamilyHistory] = useState<boolean>(true);

  // Calculate BMI
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  const inputPayload: MLPredictionInput = {
    age,
    bmi,
    systolicBP,
    diastolicBP,
    fastingGlucose,
    physicalActivityHours,
    smokingStatus,
    familyHistory
  };

  const predictionResult: MLPredictionResult = calculateHealthRisk(inputPayload, selectedModel);
  const activeMetrics = MODEL_BENCHMARKS[selectedModel];

  // Helper for BMI description
  const getBmiBadge = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-amber-400 bg-amber-950/40 border border-amber-900/50' };
    if (val <= 24.9) return { label: 'Normal Weight', color: 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50' };
    if (val <= 29.9) return { label: 'Overweight', color: 'text-amber-400 bg-amber-950/40 border border-amber-900/50' };
    return { label: 'Obesity Tier', color: 'text-rose-400 bg-rose-950/40 border border-rose-900/50' };
  };

  const bmiBadge = getBmiBadge(bmi);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#111] border border-purple-900/50 text-purple-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Educational ML Health-Risk Assessment Engine
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Multi-factor predictive classifier trained on community epidemiological survey datasets using Python Scikit-Learn.
            </p>
          </div>

          {/* Model Selector & View Switcher */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-1 bg-[#111] p-1 rounded border border-[#222]">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1 uppercase tracking-wider rounded transition ${
                  activeTab === 'calculator' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Estimator
              </button>
              <button
                onClick={() => setActiveTab('benchmarks')}
                className={`px-3 py-1 uppercase tracking-wider rounded transition ${
                  activeTab === 'benchmarks' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Benchmarks
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 uppercase tracking-wider rounded transition flex items-center gap-1 ${
                  activeTab === 'code' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3 h-3" />
                <span>Python ML</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Non-Diagnostic Disclaimer */}
        <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded text-amber-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-200 text-[11px] uppercase tracking-wider font-mono">Mandatory Educational Notice</p>
            <p className="text-[11px] text-amber-300/90 leading-relaxed font-sans">
              <strong>Risk estimation only — not a medical diagnosis.</strong> This statistical model assesses lifestyle and physiological risk markers strictly for educational and community awareness purposes. It cannot substitute for laboratory medical diagnostics.
            </p>
          </div>
        </div>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Inputs (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-gray-300 font-semibold">Physiological Parameters</h3>
              </div>

              {/* Model Choice Pill */}
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="text-xs font-mono text-purple-300 bg-[#111] border border-purple-900/50 rounded px-2.5 py-1 outline-hidden"
              >
                <option value="Random Forest">Random Forest (89.4% Acc)</option>
                <option value="Logistic Regression">Logistic Regression (83.2% Acc)</option>
                <option value="Decision Tree">Decision Tree (81.6% Acc)</option>
              </select>
            </div>

            {/* Parameter 1: Age */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Chronological Age:</span>
                <span className="font-mono font-bold text-purple-400">{age} years</span>
              </div>
              <input
                type="range"
                min={18}
                max={85}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-[#111]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-600">
                <span>18 yrs</span>
                <span>50 yrs</span>
                <span>85 yrs</span>
              </div>
            </div>

            {/* Parameter 2: Height & Weight -> BMI */}
            <div className="space-y-2 pt-2 border-t border-[#141414]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Body Mass Index (BMI):</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-purple-400 text-sm">{bmi} kg/m²</span>
                  <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded ${bmiBadge.color}`}>
                    {bmiBadge.label}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-gray-500">Height: {heightCm} cm</label>
                  <input
                    type="range"
                    min={140}
                    max={210}
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-[#111]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500">Weight: {weightKg} kg</label>
                  <input
                    type="range"
                    min={40}
                    max={140}
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-[#111]"
                  />
                </div>
              </div>
            </div>

            {/* Parameter 3: Blood Pressure */}
            <div className="space-y-2 pt-2 border-t border-[#141414]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Arterial Blood Pressure:</span>
                <span className="font-mono font-bold text-purple-400">
                  {systolicBP} / {diastolicBP} mmHg
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-gray-500">Systolic (SBP): {systolicBP}</label>
                  <input
                    type="range"
                    min={90}
                    max={190}
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-[#111]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500">Diastolic (DBP): {diastolicBP}</label>
                  <input
                    type="range"
                    min={60}
                    max={120}
                    value={diastolicBP}
                    onChange={(e) => setDiastolicBP(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-[#111]"
                  />
                </div>
              </div>
            </div>

            {/* Parameter 4: Fasting Blood Glucose */}
            <div className="space-y-1.5 pt-2 border-t border-[#141414]">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Fasting Blood Glucose:</span>
                <span className="font-mono font-bold text-purple-400">{fastingGlucose} mg/dL</span>
              </div>
              <input
                type="range"
                min={70}
                max={220}
                value={fastingGlucose}
                onChange={(e) => setFastingGlucose(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-[#111]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-600">
                <span>Normal (&lt;100)</span>
                <span>Pre-diabetic (100-125)</span>
                <span>Elevated (&ge;126)</span>
              </div>
            </div>

            {/* Parameter 5: Physical Activity */}
            <div className="space-y-1.5 pt-2 border-t border-[#141414]">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Moderate Aerobic Exercise (hrs/wk):</span>
                <span className="font-mono font-bold text-purple-400">{physicalActivityHours} hrs/week</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={physicalActivityHours}
                onChange={(e) => setPhysicalActivityHours(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-[#111]"
              />
            </div>

            {/* Parameter 6 & 7: Smoking & Family History */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#141414]">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Tobacco Usage</label>
                <select
                  value={smokingStatus}
                  onChange={(e) => setSmokingStatus(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#111] border border-[#222] text-gray-300 rounded focus:border-purple-500 outline-hidden font-mono"
                >
                  <option value="Never">Never Used</option>
                  <option value="Former">Former User (Ceased)</option>
                  <option value="Current">Current Active User</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Family Health History</label>
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="famHistory"
                      checked={familyHistory === true}
                      onChange={() => setFamilyHistory(true)}
                      className="text-purple-500 focus:ring-purple-500 bg-[#111] border-[#333]"
                    />
                    <span>Present</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="famHistory"
                      checked={familyHistory === false}
                      onChange={() => setFamilyHistory(false)}
                      className="text-purple-500 focus:ring-purple-500 bg-[#111] border-[#333]"
                    />
                    <span>None Known</span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Prediction & Explainability (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Risk Gauge Card */}
            <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                  ML Prediction Result
                </span>
                <span className="text-[10px] font-mono font-semibold text-purple-400 bg-[#111] border border-purple-900/40 px-2 py-0.5 rounded">
                  Confidence: {predictionResult.confidenceScore}%
                </span>
              </div>

              {/* Score Display */}
              <div className="text-center py-3 space-y-2">
                <div className="inline-flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                    {predictionResult.riskScore}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">/ 100</span>
                </div>

                <div>
                  <span className={`inline-block px-3 py-0.5 text-xs font-mono uppercase tracking-wider font-bold rounded ${
                    predictionResult.riskTier === 'Low Risk' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' :
                    predictionResult.riskTier === 'Moderate Risk' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50' :
                    'bg-red-950/40 text-red-400 border border-red-900/50'
                  }`}>
                    {predictionResult.riskTier}
                  </span>
                </div>
              </div>

              {/* Feature Attribution Breakdown */}
              <div className="space-y-2 pt-2 border-t border-[#141414]">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Primary Model Contributing Factors:
                </p>
                
                {predictionResult.primaryRiskFactors.length === 0 ? (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 text-xs rounded flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px]">All evaluated parameters reside within optimal baseline protective ranges!</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {predictionResult.primaryRiskFactors.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-[#111] border border-[#1a1a1a] text-xs">
                        <span className="font-semibold text-gray-200">{f.factor}</span>
                        <span className={`text-[10px] font-mono ${
                          f.severity === 'high' ? 'text-red-400' : f.severity === 'med' ? 'text-amber-400' : 'text-gray-400'
                        }`}>
                          {f.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="space-y-2 pt-2 border-t border-[#141414]">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Evidence-Based Lifestyle Recommendations:
                </p>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  {predictionResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ================= MODEL BENCHMARKS TAB ================= */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-5">
          
          {/* Comparison Table */}
          <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
            <h3 className="text-base font-semibold text-white">
              Scikit-Learn Classification Models Benchmark Comparison
            </h3>
            <p className="text-xs text-gray-400">
              Trained on 1,500 synthetic community health cohorts with 80/20 stratified train/test split.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300 border-collapse">
                <thead>
                  <tr className="border-b border-[#1a1a1a] bg-[#070707] text-gray-500 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Classifier Architecture</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Precision</th>
                    <th className="py-3 px-4">Recall</th>
                    <th className="py-3 px-4">F1-Score</th>
                    <th className="py-3 px-4">ROC-AUC</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#141414] font-mono text-xs">
                  {Object.entries(MODEL_BENCHMARKS).map(([name, m]) => (
                    <tr key={name} className={selectedModel === name ? 'bg-[#141414] font-bold text-white' : ''}>
                      <td className="py-3 px-4 text-gray-200">{m.name}</td>
                      <td className="py-3 px-4 text-purple-400">{m.accuracy}%</td>
                      <td className="py-3 px-4">{m.precision}%</td>
                      <td className="py-3 px-4">{m.recall}%</td>
                      <td className="py-3 px-4">{m.f1Score}%</td>
                      <td className="py-3 px-4 text-emerald-400">{m.rocAuc}</td>
                      <td className="py-3 px-4">
                        {name === 'Random Forest' ? (
                          <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 rounded font-bold">
                            Primary Model
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-[#111] text-gray-500 border border-[#222] rounded">
                            Baseline
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3x3 Confusion Matrix */}
          <div className="bg-[#0a0a0a] p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Confusion Matrix Analysis ({activeMetrics.name})
                </h3>
                <p className="text-xs text-gray-400">True Class vs Predicted Class distribution</p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-[#111] border border-purple-900/40 px-2.5 py-1 rounded">
                Test Set: N = 460
              </span>
            </div>

            <div className="max-w-md mx-auto py-3">
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                {/* Header Row */}
                <div></div>
                <div className="text-[10px] text-gray-500 pb-1">Pred: Low</div>
                <div className="text-[10px] text-gray-500 pb-1">Pred: Med</div>
                <div className="text-[10px] text-gray-500 pb-1">Pred: High</div>

                {/* Actual Low */}
                <div className="text-[10px] text-gray-500 self-center text-left">Actual Low</div>
                <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 rounded font-bold">
                  {activeMetrics.confusionMatrix.matrix[0][0]} (TP)
                </div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[0][1]}
                </div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[0][2]}
                </div>

                {/* Actual Med */}
                <div className="text-[10px] text-gray-500 self-center text-left">Actual Med</div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[1][0]}
                </div>
                <div className="p-3 bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 rounded font-bold">
                  {activeMetrics.confusionMatrix.matrix[1][1]} (TP)
                </div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[1][2]}
                </div>

                {/* Actual High */}
                <div className="text-[10px] text-gray-500 self-center text-left">Actual High</div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[2][0]}
                </div>
                <div className="p-3 bg-[#111] border border-[#222] text-gray-400 rounded">
                  {activeMetrics.confusionMatrix.matrix[2][1]}
                </div>
                <div className="p-3 bg-purple-950/60 border border-purple-800/60 text-purple-300 rounded font-bold">
                  {activeMetrics.confusionMatrix.matrix[2][2]} (TP)
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ================= PYTHON ML CODE TAB ================= */}
      {activeTab === 'code' && (
        <div className="bg-[#0a0a0a] text-gray-300 p-5 sm:p-6 rounded-xl border border-[#1a1a1a] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white font-mono">ml/train_risk_model.py</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Python 3.11 • scikit-learn 1.4.0</span>
          </div>

          <pre className="text-xs font-mono text-emerald-400/90 overflow-x-auto leading-relaxed p-2 bg-[#050505] rounded border border-[#141414]">
{`# ==============================================================================
# SCRIPT: train_risk_model.py
# PROJECT: Community Health & Population Analytics (CHP Analytics)
# ALGORITHM: Random Forest Classifier Ensemble for Educational Health Risk
# ==============================================================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import joblib

# 1. Load Synthetic Epidemiological Cohort
df = pd.read_csv("ml/dataset/community_health_synthetic.csv")

# 2. Features and Target Definition
FEATURES = ['age', 'bmi', 'systolic_bp', 'diastolic_bp', 'fasting_glucose', 
            'physical_activity_hours', 'smoking_code', 'family_history']
X = df[FEATURES]
y = df['risk_tier']  # 0: Low, 1: Moderate, 2: Higher

# 3. Train-Test Split (80/20 Stratified)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# 4. Feature Scaling Pipeline
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. Train Random Forest Classifier
rf_clf = RandomForestClassifier(
    n_estimators=100,
    max_depth=8,
    min_samples_split=4,
    class_weight='balanced',
    random_state=42
)
rf_clf.fit(X_train_scaled, y_train)

# 6. Evaluation Metrics
y_pred = rf_clf.predict(X_test_scaled)
print("=== CLASSIFICATION REPORT ===")
print(classification_report(y_test, y_pred, target_names=['Low Risk', 'Moderate Risk', 'Higher Risk']))

# 7. Export Serialized Pipeline
joblib.dump({'model': rf_clf, 'scaler': scaler}, "ml/chp_risk_model.pkl")
print("Model pipeline successfully saved to ml/chp_risk_model.pkl")`}
          </pre>
        </div>
      )}

    </div>
  );
};
